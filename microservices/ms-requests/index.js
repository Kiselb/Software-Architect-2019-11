const express = require('express');
const path = require('path');
const mssql = require('mssql');
const cors = require('cors');                   // npm install --save cors
const bodyParser = require('body-parser');      // npm install --save body-parser
const jwt = require('jsonwebtoken');            // npm install --save jsonwebtoken
const amqp = require('amqplib/callback_api');   // npm install amqplib

const mssql_config = {
    //server: "10.106.101.113",
    server: "172.17.0.2",
    authentication: { options: { userName: "webuser", password: "mvkMVK$@#1245" }},
    options: { database: "Warehouse", useUTC: false } 
};

var mssqlPool;

(async function() {
  console.log("Try to connect on MS SQL Server");
  mssqlPool = await new mssql.ConnectionPool(mssql_config).connect();
  console.log("MS SQL Server connected successfully");
})();

sendNotification = function(userId, message) {
    return new Promise(async (resolve, reject) => {
        amqp.connect('amqp://10.106.101.113', function(error, connection) {
            if (error) {
              reject(error);
            }
            console.log("Rabbit MQ Connected successfully");
            connection.createChannel(function(error, channel) {
              if (error) {
                  reject(error);
                }
                var queue = 'hello';
                var msg = 'Hello world';
            
                channel.assertQueue(queue, {
                  durable: false
                });
            
                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
                resolve();      
            });
        });
    });
};

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/notify', function(req, res) {
    const serviceRequestId = req.body.serviceRequestId

    console.log("Sending notification message ...");

    res.status(201).json({});
    console.log('Call notifypush microservice');
  
});

app.listen(3400);
console.log('Running on http://localhost:3400');
