const express = require('express');
const path = require('path');
const mssql = require('mssql');
const cors = require('cors');                       // npm install --save cors
const bodyParser = require('body-parser');          // npm install --save body-parser
const jwt = require('jsonwebtoken');                // npm install --save jsonwebtoken
const config = require('./config.json');

const mssql_config = {
    //server: "10.106.101.113",
    //server: "172.27.0.2",
    server: config.db.host,
    database: "NotifyEMail",
    authentication: { options: { userName: "webuser", password: "mvkMVKp!@#$1234" }},
    options: { database: "NotifyEMail", useUTC: false } 
};

var mssqlPool;

(async function() {
  console.log("Try to connect on MS SQL Server");
  mssqlPool = await new mssql.ConnectionPool(mssql_config).connect();
  console.log("MS SQL Server connected successfully");
})();

sendNotification = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            //request.input('UserID', mssql.UniqueIdentifier, params.userId);
            request.input('SendTo', mssql.NVarChar, params.mailTo);
            request.input('Subject', mssql.NVarChar, params.subject);
            request.input('Message', mssql.NVarChar, params.message);

            console.log("Sendinig e-mail notification");
            const result = await request.execute('dbo.NotifyByEMail');

            resolve(result);
        }
        catch(error) {
            console.log(error);
            reject(error);
        }
    });
};

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/notify', function(req, res) {
    const params = {
      pool: mssqlPool,
      mailTo: req.body.mailTo,
      subject: req.body.subject,
      message: req.body.message,
      userId: req.body.userId
    };
  
    console.log("Sending e-mail ...");

    sendNotification(params)
    .then(result => res.status(201).json({ "result": 0, "message": "", "userId": params.userId}))
    .catch(error => res.status(500).send({ "result": -1, "message": error.message, "userId": params.userId}));
});

app.listen(3200);
console.log('E-Mail notification microservice running on http://localhost:3200');
