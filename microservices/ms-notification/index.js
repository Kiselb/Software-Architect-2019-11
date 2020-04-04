const express = require('express');
const axios = require('axios');                 // npm install axios
const path = require('path');
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

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/notify', function(req, res) {
    const consumerId = req.body.consumerId;
    const message = req.body.message;

    res.status(201).json({});
    console.log('Call microservices ...');

    const pushPayload = {
        notification: {
            title: 'Notifications',
            body: 'This notification send through Angular',
            icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
            vibrate: [100, 50, 100],
            data: {
                url: 'https://otus.ru'
            }
        },
        userId: userId
    };
    const emailPayload = {
        mailTo: req.body.mailTo,
        subject: "Service request change status",
        message: message,
        userId: userId
    };

    //axios.post('http://localhost:3100/notifypush', pushPayload)
    axios.post('http://172.17.0.4:3100/notifypush', pushPayload)
    .then(response => { console.log(`Push notify Status Code: ${response.status}`); })
    .catch(error => { console.log(`Push notify Error: ${error}`); });
  
    //axios.post('http://localhost:3200/notifyemail', emailPayload)
    axios.post('http://172.17.0.5:3200/notifyemail', emailPayload)
    .then(response => { console.log(`EMail notify Status Code: ${response.status}`); })
    .catch(error => { console.log(`EMail notify Error: ${error}`); });
});

app.listen(3500);
console.log('Running on http://localhost:3500');
