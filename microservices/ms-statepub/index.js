const express = require('express');                 // npm install express --save
const axios = require('axios');                     // npm install axios
const path = require('path');
const mssql = require('mssql');                     // npm install mssql
const cors = require('cors');                       // npm install --save cors
const bodyParser = require('body-parser');          // npm install --save body-parser
const jwt = require('jsonwebtoken');                // npm install --save jsonwebtoken
const amqp = require('amqplib/callback_api');       // npm install amqplib
const config = require('./config.json');

const mssql_config = {
    //server: "10.106.101.113",
    //server: "172.27.0.2",
    server: config.db.host,
    database: "Operations",
    authentication: { options: { userName: "webuser", password: "mvkMVKp!@#$1234" }},
    options: { database: "Operations", useUTC: false, enableArithAbort: false } 
};

var mssqlPool;

(async function() {
  console.log("Try to connect on MS SQL Server");
  mssqlPool = await new mssql.ConnectionPool(mssql_config).connect();
  console.log("MS SQL Server connected successfully");
})();

stateSnapshot = function() {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(mssqlPool);

            const result = await request.execute('dbo.StateSnapshot');
            console.dir(result);
            resolve(result.recordset);
        }
        catch(error) {
            reject(error);
        }
    });
}
statePublished = function(key) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(mssqlPool);
            request.input('IdempotencyKey', mssql.UniqueIdentifier, key);
            const result = await request.execute('dbo.StatePublished');
            resolve(true);
        }
        catch(error) {
            reject(error);
        }
    });
}
statePublish = function(storagesState) {
    return new Promise(async (resolve, reject) => {
        try {
            //amqp.connect('amqp://10.106.101.113', function(error, connection) {
            //amqp.connect('amqp://172.27.0.6', function(error, connection) {
            amqp.connect(config.amqp.host, function(error, connection) {
                if (error) {
                    reject(error);
                }
                console.log("Rabbit MQ Connected successfully");
                connection.createChannel(function(error, channel) {
                    if (error) {
                        reject(error);
                    }
                    var queue = 'storagesstate';
                  
                    channel.assertQueue(queue, {
                        durable: false
                    });
                      
                    const message = {
                        notification: storagesState,
                    };
                    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
                    console.log(" [x] Sent %s", JSON.stringify(message));
                    resolve(storagesState[0]["IdempotencyKey"]);      
                });
            });
        }
        catch(error) {
            reject(error);
        }     
    });
};

polling = function() {
    stateSnapshot()
    .then(data => {
        if (data.length > 0) {
            return statePublish(data);
        } else {
            return Promise.resolve(true);
        }
    })
    .then(key => {
        if (key) {
            console.log("State Published ...")
            return statePublished(key)
        } else {
            return Promise.resolve(true)
        }
    })
    .then(() => {})
    .catch(error => console.dir(error))
}

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/start', function(req, res) {
    console.log("Start publications ...");
    pollingTimer.ref();
    res.sendStatus(200);
});
app.post('/stop', function(req, res) {
    console.log("Stop publications ...");
    pollingTimer.unref();
    res.sendStatus(200);
});

var pollingTimer = setInterval(polling, 2000);

app.listen(3800);
console.log('Polling Publisher Microservice Running on http://localhost:3800');
