const express = require('express');
const fileUpload = require('express-fileupload'); // npm install --save express-fileupload
const axios = require('axios');                   // npm install axios
const path = require('path');
const mssql = require('mssql');
const cors = require('cors');                     // npm install --save cors
const bodyParser = require('body-parser');        // npm install --save body-parser
const jwt = require('jsonwebtoken');              // npm install --save jsonwebtoken
const amqp = require('amqplib/callback_api');     // npm install amqplib
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

registerOperations = function (operations) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(mssqlPool);
            request.input('Operations', mssql.NVarChar(mssql.MAX), operations);
            const result = await request.execute('dbo.PlaceOperations');
            resolve(result.returnValue);
        }
        catch(error) {
            reject(error);
        }
    });
}

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());

app.post('/operations', function(req, res) {
    console.log("Register Operations JSON ...");
    console.dir(req.body);
    registerOperations(JSON.stringify(req.body))
    .then(result => { console.log(result); res.status(200).send({ result: result }); })
    .catch(error => { console.dir(error); res.status(500).send(`{"error": ${error.message}}`); });
});

app.listen(4000);
console.log('Operations Microservice Running on http://localhost:4000');
