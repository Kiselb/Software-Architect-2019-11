const express = require('express');
const path = require('path');
const mssql = require('mssql');
const cors = require('cors'); // npm install --save cors
const bodyParser = require('body-parser'); // npm install --save body-parser
const jwt = require('jsonwebtoken'); // npm install --save jsonwebtoken
const webPush = require('web-push'); //npm install --save web-push

const publicVapidKey = "BHZR7gUHJwp6FcZG4gPmuB8zPk6YZmdGN74MBVLfCZCLDwzQoSPdb0gTbpJJ_KzzZ3Fq-CZU-1wOKMzlIHXUWHc";
const privateVapidKey = "ObceMkqK2e1_irMbTsAn8bbsEtgGh2LBhSfgiTPQQKM";

webPush.setVapidDetails('mailto:wfw311@hotmail.com', publicVapidKey, privateVapidKey);

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

subscribeUser = function(params) {
  return new Promise(async (resolve, reject) => {
      try {
          const request = await new mssql.Request(params.pool);
          request.input('UserID', mssql.UniqueIdentifier, params.userId);
          request.input('Subscription', mssql.NVarChar, params.subscription);

          const result = await request.execute('dbo.UsersSubscriptionRegister');
          resolve(result);
      }
      catch(error) {
          reject(error);
      }
  });
};
getSubscription = function(params) {
  return new Promise(async (resolve, reject) => {
      try {
          const request = await new mssql.Request(params.pool);
          request.input('UserID', mssql.UniqueIdentifier, params.userId);

          const result = await request.execute('dbo.UsersSubscription');

          if (result.recordsets.length === 0) throw new Error("User isn't subscribing");
          if (result.recordsets[0].length === 0) throw new Error("User isn't subscribing");

          const subscription = result.recordsets[0][0].Subscription;

          if (!!subscription) {
              resolve(subscription);
          } else {
              throw new Error("User isn't subscribing");
          }
      }
      catch(error) {
          reject(error);
      }
  });
};

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/subscribe', function(req, res) {

    console.log('Subscribing ...');

    subscribeUser({ pool: mssqlPool, subscription: JSON.stringify(req.body.subscription), userId: req.body.userId })
    .then(result => { console.log('OK'); res.status(201).json({ "result": 0, "message": JSON.stringify(req.body.subscription), "userId": ''})})
    .catch(error => { console.log(error); res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "userId": ''}))});
});
app.post('/notifypush', function(req, res) {
    const params = {
      pool: mssqlPool,
      userId: req.body.userId
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
  
    console.log("Notifing ...");

    getSubscription(params)
    .then(subscription => { console.log(subscription); webPush.sendNotification(JSON.parse(subscription), payload);})
    .then(result => res.status(201).json({ "result": 0, "message": "", "userId": params.userId}))
    .catch(error => { console.log(error); res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "userId": params.userId}))});
});
    
app.listen(3100);
console.log('Running on http://localhost:3100');
