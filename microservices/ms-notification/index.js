const express = require('express');
const axios = require('axios');                 // npm install axios
const path = require('path');
const cors = require('cors');                   // npm install --save cors
const bodyParser = require('body-parser');      // npm install --save body-parser
const jwt = require('jsonwebtoken');            // npm install --save jsonwebtoken
const amqp = require('amqplib/callback_api');   // npm install amqplib
const config = require('./config.json');

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

amqp.connect(
    //'amqp://10.106.101.113', function(error0, connection) {
    //amqp://172.27.0.6', function(error0, connection) {
    config.amqp.host, function(error0, connection) {
        if (error0) {
        //throw error0;
        console.log(error0)
    }
    console.log("Rabbit MQ Connected successfully");
    connection.createChannel(function(error1, channel) {
        if (error1) {
            //throw error1;
            console.log(error1)
        }
        var queue = 'usernotification';
  
        channel.assertQueue(queue, {
            durable: false
        });
      
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            const data = JSON.parse(msg.content);
            notify(data);
        }, {
            noAck: true
        });
    });
});

notify = function(data) {
    const pushPayload = {
        notification: {
            title: 'Legion Warehouse Application Notification',
            body: `${data.notification.message} ${data.notification.srid} состояние ${data.notification.status}`,
            icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
            vibrate: [100, 50, 100],
            data: {
                url: 'https://www.legion.ru'
            }
        },
        userId: data.notification.userId
    };
    const emailPayload = {
        mailTo: data.notification.notification,
        subject: data.notification.message,
        message: `${data.notification.meesage} ${data.notification.srid} состояние ${data.notification.status}`,
        userId: data.notification.userId
    };

    //axios.post('http://localhost:3100/notify', pushPayload)
    //axios.post('http://172.27.0.4:3100/notify', pushPayload)
    axios.post(`${config.push.host}:3100/notify`, pushPayload)
    .then(response => { console.log(`Push notify Status Code: ${response.status}`); })
    .catch(error => { console.log(`Push notify Error: ${error}`); });
  
    //axios.post('http://localhost:3200/notify', emailPayload)
    //axios.post('http://172.27.0.5:3200/notify', emailPayload)
    axios.post(`${config.email.host}:3200/notify`, emailPayload)
    .then(response => { console.log(`EMail notify Status Code: ${response.status}`); })
    .catch(error => { console.log(`EMail notify Error: ${error}`); });
};

app.post('/subscribe', function(req, res) {
    console.log('Push subscribing: Call push microservice');
    
    //axios.post('http://localhost:3100/subscribe', { subscription: req.body.subscription, userId: req.body.userId })
    //axios.post('http://172.27.0.4:3100/subscribe', { subscription: req.body.subscription, userId: req.body.userId })
    axios.post(`${config.push.host}:3100/subscribe`, { subscription: req.body.subscription, userId: req.body.userId })
    .then(response => {
      console.log(`Status Code: ${response.status}`);
      res.status(201).json({ "result": 0, "message": JSON.stringify(req.body.subscription), "userId": req.body.userId });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ "result": -1, "message": error, "userId": userId});
    });
});
  
app.listen(3500);
console.log('Notification Microservice Running on http://localhost:3500');
