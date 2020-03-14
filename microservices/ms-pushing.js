const express = require('express');
const path = require('path');
const mssql = require('mssql');
const cors = require('cors'); // npm install --save cors
const bodyParser = require('body-parser'); // npm install --save body-parser
const jwt = require('jsonwebtoken'); // npm install --save jsonwebtoken
const webPush = require('web-push'); //npm install --save web-push

const config = require('../config.json');
const store = require('../store.mssql');

const publicVapidKey = "BHZR7gUHJwp6FcZG4gPmuB8zPk6YZmdGN74MBVLfCZCLDwzQoSPdb0gTbpJJ_KzzZ3Fq-CZU-1wOKMzlIHXUWHc";
const privateVapidKey = "ObceMkqK2e1_irMbTsAn8bbsEtgGh2LBhSfgiTPQQKM";

webPush.setVapidDetails('mailto:wfw311@hotmail.com', publicVapidKey, privateVapidKey);

const mssql_config = {
    server: "10.106.101.113", //server: "172.17.0.2",
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

app.post('/subscribe', function(req, res) {
    const params = {
      pool: mssqlPool,
      userId: req.body.userId,
      subscription: JSON.stringify(req.body.subscription)
    };
  
    const payload = JSON.stringify({
      notification: {
        title: 'Task #2. Notifications',
        body: 'This notification send through Angular',
        icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
        vibrate: [100, 50, 100],
        data: {
          url: 'https://otus.ru'
        }
      }
    });
    console.dir(params);
    res.status(201).json({});
    webPush.sendNotification(req.body, payload);
    return;
    store.subscribeUser(params)
    .then(result => {
      res.status(200).send(JSON.stringify({ "result": 0, "message": 'User subscribed', "userId": params.userId }));   
    })
    .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "userId": params.userId}))});
});
  
app.listen(3100);
console.log('Running on http://localhost:3100');

