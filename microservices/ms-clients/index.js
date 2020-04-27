const express = require('express');
const path = require('path');
const mssql = require('mssql');
const cors = require('cors');                   // npm install --save cors
const bodyParser = require('body-parser');      // npm install --save body-parser
const jwt = require('jsonwebtoken');            // npm install --save jsonwebtoken
const amqp = require('amqplib/callback_api');   // npm install amqplib
const config = require('./config.json');

const mssql_config = {
    //server: "10.106.101.113",
    //server: "172.27.0.2",
    server: config.db.host,
    database: "Clients",
    authentication: { options: { userName: "webuser", password: "mvkMVKp!@#$1234" }},
    options: { database: "Clients", useUTC: false, enableArithAbort: false } 
};

var mssqlPool;

(async function() {
  mssqlPool = await new mssql.ConnectionPool(mssql_config).connect();
})();

clientAddNew = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('ClientName', mssql.NVarChar, params.clientName);
            request.input('Email', mssql.NVarChar, params.email);
            request.input('Phone', mssql.NVarChar, params.phone);
            request.input('Address', mssql.NVarChar, params.address);
            request.input('ContactName', mssql.NVarChar, params.contactName);
            request.output('UID', mssql.UniqueIdentifier);

            const result = await request.execute('dbo.ClientsAddNew');
            resolve(result.output.UID);
        }
        catch(error) {
            reject(error);
        }
    });
};
clientUpdate = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('UID', mssql.NVarChar, params.ClientID);
            request.input('Email', mssql.NVarChar, params.EMail);
            request.input('Phone', mssql.NVarChar, params.Phone);
            request.input('Address', mssql.NVarChar, params.Address);
            request.input('ContactName', mssql.NVarChar, params.ContactName);

            const result = await request.execute('dbo.ClientsUpdate');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
clients = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('Criteria', mssql.NVarChar, params.criteria);

            const result = await request.execute('dbo.ClientsList');
            resolve(result.recordset);
        }
        catch(error) {
            reject(error);
        }
    });
};
ClientsAccept = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);

            request.input('XML', mssql.Xml, params.xml);
            request.output('XML_REACHED', mssql.NVarChar(mssql.MAX));

            const result = await request.execute('dbo.ClientsAccept');
            resolve(result.output["XML_REACHED"]);
        }
        catch(error) {
            console.log(error)
            reject(error);
        }
    });
}

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/clients', function(req, res) {
    const params = Object.assign({}, req.body);
    params.pool = mssqlPool;
    clients(params)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send({ "result": -1, "message": error.message, "clientId": ''}));
});
app.post('/clients', function(req, res) {
    const params = Object.assign({}, req.body);
    params.pool = mssqlPool;
    clientAddNew(params)
    .then(uid => res.status(200).send(uid))
    .catch(error => res.status(500).send({ "result": -1, "message": error.message, "clientId": ''}));
});
app.put('/clients/:id', function(req, res) {
    const params = Object.assign({}, req.body);
    params.pool = mssqlPool;
    clientUpdate(params)
    .then(result => res.status(200).send({ "result": 0, "message": 'Updated', "clientId": params.uid }))
    .catch(error => { console.dir(error); res.status(500).send({ "result": -1, "message": error.message, "clientId": ''}); });
});
app.post('/clients/accept', function(req, res) {
    const params = Object.assign({}, req.body);
    params.pool = mssqlPool;
  
    console.log(req.body.xml)
    ClientsAccept(params)
    .then(xml => { console.log(xml); res.status(200).send({ "xml": xml }) })
    .catch(error => { console.dir(error); res.status(500).send({ "result": -1, "message": error.message})});
});
  
app.listen(3600);
console.log('Clients Microservice Running on http://localhost:3600');
