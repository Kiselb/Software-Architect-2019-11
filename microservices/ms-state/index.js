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
    database: "State",
    authentication: { options: { userName: "webuser", password: "mvkMVKp!@#$1234" }},
    options: { database: "State", useUTC: false, enableArithAbort: false } 
};

var mssqlPool;

(async function() {
  console.log("Try to connect on MS SQL Server");
  mssqlPool = await new mssql.ConnectionPool(mssql_config).connect();
  console.log("MS SQL Server connected successfully");
})();

var miniQueue = [];
var miniQueueLock = false;

processMiniQueue = function() {
    if (miniQueue.length === 0) {
        return;
    }
    if (miniQueueLock) {
        return;
    }
    miniQueueLock = true;
    const data = miniQueue.shift();

    console.dir(data);

    stateUpdate(data)
    .then(() => { console.log("State Updated"); miniQueueLock = false; })
    .catch(error => { console.log(error); miniQueueLock = false; });
}

setInterval(processMiniQueue, 20);

stateUpdate = function(state) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(mssqlPool);
            request.input('StateSubset', mssql.NVarChar(mssql.MAX), state);
            const result = await request.execute('dbo.StateUpdate');
            resolve(true);
        }
        catch(error) {
            reject(error);
        }
    });
}

getInventoryByClient = function(clientId) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(mssqlPool);
            request.input('ClientID', mssql.UniqueIdentifier, clientId);
            const result = await request.execute('dbo.StateByClient');
            resolve(result.recordset);
        }
        catch(error) {
            reject(error);
        }
    });
}

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

amqp.connect(config.amqp.host, function(error0, connection) {
    try {
        if (error0) {
            throw error0;
        }
        console.log("Rabbit MQ Connected successfully");
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'storagesstate';
      
            channel.assertQueue(queue, {
                durable: false
            });
          
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    
            channel.consume(queue, function(msg) {
                var data = JSON.parse(msg.content.toString());

                console.log(" [x] Received %s", msg.content.toString());
                console.dir(data.notification);

                miniQueue.push(JSON.stringify(data.notification));

                // stateUpdate(JSON.stringify(data.notification))
                // .then(() => { lock = false; console.log("State Updated"); })
                // .catch(error => { lock = false; console.log(error)});
            }, {
                noAck: true
            });
        });
    }
    catch(error) {
        console.dir(error);
    }
});

app.get('/inventory/clients/:clientId', function(req, res) {

    getInventoryByClient(req.params.clientId)
    .then(data => axios.post(`${config.sku.host}:3700/mixin/inventory`, data))
    .then(response => { console.dir(response.data); res.status(200).send(response.data); })
    .catch(error => res.status(500).send(`{"error": ${error.message}}`))
});
app.get('/inventory/storages/:storageId', function(req, res) {

});
app.post('/inventory/skulist', function(req, res) { // body: Articles UUID List

});

app.listen(3900);
console.log('Storages State Microservice Running on http://localhost:3900');
