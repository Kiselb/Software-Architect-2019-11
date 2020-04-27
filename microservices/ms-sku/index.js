const express = require('express');                 // npm install express --save
const axios = require('axios');                     // npm install axios
const path = require('path');
const mssql = require('mssql');                     // npm install mssql
const cors = require('cors');                       // npm install --save cors
const bodyParser = require('body-parser');          // npm install --save body-parser
const jwt = require('jsonwebtoken');                // npm install --save jsonwebtoken
const fileUpload = require('express-fileupload');   // npm install --save express-fileupload
const config = require('./config.json');

const mssql_config = {
    //server: "10.106.101.113",
    //server: "172.27.0.2",
    server: config.db.host,
    database: "SKU",
    authentication: { options: { userName: "webuser", password: "mvkMVKp!@#$1234" }},
    options: { database: "SKU", useUTC: false, enableArithAbort: false } 
};

var mssqlPool;

(async function() {
  console.log("Try to connect on MS SQL Server");
  mssqlPool = await new mssql.ConnectionPool(mssql_config).connect();
  console.log("MS SQL Server connected successfully");
})();

SKUAccept = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);

            request.input('XML', mssql.Xml, params.xml);
            request.output('XML_REACHED', mssql.NVarChar(mssql.MAX));

            const result = await request.execute('dbo.SKUAccept');
            resolve(result.output["XML_REACHED"]);
        }
        catch(error) {
            console.log(error)
            reject(error);
        }
    });
}
SKUMixin = function(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(mssqlPool);

            request.input('Inventory', mssql.NVarChar(mssql.MAX), JSON.stringify(data));
            request.output('InventoryReached', mssql.NVarChar(mssql.MAX));

            const result = await request.execute('dbo.SKUMixinInventory');
            resolve(result.output["InventoryReached"]);
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
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());

app.post('/sku/accept', function(req, res) {
    const params = Object.assign({}, req.body);
    params.pool = mssqlPool;
  
    console.log(req.body.xml)
    SKUAccept(params)
    .then(xml => { console.log(xml); res.status(200).send({ "xml": xml }) })
    .catch(error => { console.dir(error); res.status(500).send({ "result": -1, "message": error.message})});
});
app.post('/mixin/inventory', function(req, res) {
    SKUMixin(req.body)
    .then(result => { console.log(result); res.status(200).send(JSON.parse(result)) })
    .catch(error => { console.dir(error); res.status(500).send({ "result": -1, "message": error.message})});
})

app.listen(3700);
console.log('SKU Microservice Running on http://localhost:3700');
