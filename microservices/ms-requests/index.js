const express = require('express');
const fileUpload = require('express-fileupload'); // npm install --save express-fileupload
const path = require('path');
const mssql = require('mssql');
const cors = require('cors');                     // npm install --save cors
const bodyParser = require('body-parser');        // npm install --save body-parser
const jwt = require('jsonwebtoken');              // npm install --save jsonwebtoken
const amqp = require('amqplib/callback_api');     // npm install amqplib
const config = require('./config.json');
const xlsx = require('./import.xlsx');

const mssql_config = {
    server: "10.106.101.113",
    //server: "172.17.0.2",
    database: "ServiceRequests",
    authentication: { options: { userName: "webuser", password: "mvkMVK$@#1245" }},
    options: { database: "ServiceRequests", useUTC: false, enableArithAbort: false } 
};

var mssqlPool;

(async function() {
  console.log("Try to connect on MS SQL Server");
  mssqlPool = await new mssql.ConnectionPool(mssql_config).connect();
  console.log("MS SQL Server connected successfully");
})();

sendNotification = function(userId, message) {
    return new Promise(async (resolve, reject) => {
        //amqp.connect('amqp://10.106.101.113', function(error, connection) {
        amqp.connect('amqp://172.17.0.6', function(error, connection) {
            if (error) {
              reject(error);
            }
            console.log("Rabbit MQ Connected successfully");
            connection.createChannel(function(error, channel) {
              if (error) {
                  reject(error);
                }
                var queue = 'hello';
            
                channel.assertQueue(queue, {
                  durable: false
                });
            
                channel.sendToQueue(queue, Buffer.from(message));
                console.log(" [x] Sent %s", message);
                resolve();      
            });
        });
    });
};
serviceRequestsTypes = function(params) {
  return new Promise(async (resolve, reject) => {
      try {
          const request = await new mssql.Request(params.pool);
          const result = await request.execute('dbo.ServiceRequestsTypesList');
          resolve(result.recordset);
      }
      catch(error) {
          reject(error);
      }
  });
};
serviceRequests = function(params) {
  return new Promise(async (resolve, reject) => {
      try {
          const request = await new mssql.Request(params.pool);

          request.input('Section', mssql.Int, params.section);
          request.input('Criteria', mssql.NVarChar, params.criteria);
          request.input('SortOrder', mssql.NVarChar, params.sortOrder);
          request.input('SortType', mssql.NVarChar, params.sortType);
          request.input('PageNo', mssql.Int, params.pageNo);
          request.input('PageSize', mssql.Int, params.pageSize);

          const result = await request.execute('dbo.ServiceRequestsList');
          resolve(result.recordset);
      }
      catch(error) {
          reject(error);
      }
  });
};
serviceRequestsHeader = function(params) {
  return new Promise(async (resolve, reject) => {
      try {
          const request = await new mssql.Request(params.pool);
          request.input('SRID', mssql.UniqueIdentifier, params.srid);
          const result = await request.execute('dbo.ServiceRequestsHeader');
          resolve(JSON.parse(result.recordset[0].DATA)["SR-HEADERS"]);
      }
      catch(error) {
          reject(error);
      }
  });
};
serviceRequestsHeaderUpdate = function(params) {
  return new Promise(async (resolve, reject) => {
      try {
          const request = await new mssql.Request(params.pool);

          request.input('SRID', mssql.UniqueIdentifier, params.srid);
          request.input('DueDate', mssql.DateTime, params.DueDate);
          request.input('Remarks', mssql.NVarChar, params.Remarks);

          const result = await request.execute('dbo.ServiceRequestsHeaderUpdate');
          resolve(result);
      }
      catch(error) {
          reject(error);
      }
  });
};
serviceRequestsDetails = function(params) {
  return new Promise(async (resolve, reject) => {
      try {
          const request = await new mssql.Request(params.pool);
          request.input('ServiceRequestID', mssql.UniqueIdentifier, params.srid);
          const result = await request.execute('dbo.ServiceRequestsDetails');
          resolve(JSON.parse(result.recordset[0].DATA)["SR-DETAILS"]);
      }
      catch(error) {
          reject(error);
      }
  });
};
serviceRequestsSetStatus = function(params) {
  return new Promise(async (resolve, reject) => {
    try {
        const request = await new mssql.Request(params.pool);

        request.input('ServiceRequestID', mssql.UniqueIdentifier, params.srid);
        request.input('StatusID', mssql.Int, params.status);
        request.input('Instructions', mssql.NVarChar, params.instructions);

        const result = await request.execute('dbo.ServiceRequestsSetStatus');
        resolve(result);
    }
    catch(error) {
        reject(error);
    }
  });
};
serviceRequestRegisterFile = function(params) {
  return new Promise(async (resolve, reject) => {
      try {
          const request = await new mssql.Request(params.pool);

          request.input('xml', mssql.Xml, params.xml);
          request.output('ServiceRequestID', mssql.UniqueIdentifier);

          const result = await request.execute('dbo.ServiceRequestsAddNew');
          resolve(result.output.ServiceRequestID);
      }
      catch(error) {
          reject(error);
      }
  });
};

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());

app.post('/notify', function(req, res) {
    const serviceRequestId = req.body.serviceRequestId

    console.log("Sending notification message ...");

    res.status(201).json({});
    console.log('Call notifypush microservice');
  
});
app.get('/requests/types', function(req, res) {
  console.log("Get Requests types ...");
  const params = Object.assign({}, req.body);
  params.pool = mssqlPool;

  serviceRequestsTypes(params)
  .then(data => res.status(200).send(data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message}));
});
app.get('/requests', function(req, res) {

  console.log("Get Service Requests ...");
  const params = Object.assign({}, req.body);
  params.section = req.query.section;
  params.criteria = req.query.criteria;
  params.sortOrder = req.query.sortorder;
  params.sortType = req.query.sorttype;
  params.pageNo = req.query.page;
  params.pageSize = req.query.pagesize;
  params.pool = mssqlPool;

  serviceRequests(params)
  .then(data => res.status(200).send(data[0].DATA))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message}));
});
app.get('/requests/:srid', function(req, res) {
  console.log("Get service request header ...");
  const params = Object.assign({}, req.body);
  
  params.srid = req.params.srid;
  params.pool = mssqlPool;

  serviceRequestsHeader(params)
  .then(data => res.status(200).send(data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message}));
});
app.put('/requests/:srid', function(req, res) {
  console.log("Update service request header ...");
  const params = Object.assign({}, req.body);
  
  params.srid = req.params.srid;
  params.pool = mssqlPool;

  serviceRequestsHeaderUpdate(params)
  .then(result => res.status(200).send({ "result": 0, "message": 'Updated', "serviceRequestID": params.srid }))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message, "serviceRequestID": params.srid }));
});
app.put('/servicerequests/:srid/status', function(req, res) {
  console.log("Update service request status ...");
  console.dir(req.body);
  const params = Object.assign({}, req.body);
  params.srid = req.params.srid;
  params.pool = mssqlPool;

  serviceRequestsSetStatus(params)
  .then(data => { res.status(200).send(JSON.stringify(data))})
  .catch(error => { console.dir(error); res.status(500).send(JSON.stringify({ "result": -1, "message": error.message}))});
});
app.get('/requests/:srid/details', function(req, res) {
  console.log("Get service request details ...");
  const params = Object.assign({}, req.body);
  
  params.srid = req.params.srid;
  params.pool = mssqlPool;

  serviceRequestsDetails(params)
  .then(data => res.status(200).send(data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message }));
});
app.post('/requests/upload', function(req, res) {
  console.log("Upload service request file ...");
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded');
  }
  req.files.file.mv(config.development.dstpath + req.files.file.name, function(error) {
      if (error) {
        return res.status(500).send(`{ "error": ${error} }`);
      }
      if (!((req.body.clientId) && (req.body.subdivisionId) && (req.body.typeId) && (req.body.dueDate))) {
        return res.status(400).send(`{ "error": "Не заданы обязательные параметры импорта файла" }`);
      }
      xlsx.XLSXToXML(req.files.file.name, req.body.clientId, req.body.subdivisionId, req.body.typeId, req.body.dueDate, req.body.remarks)
      .then(xml => serviceRequestRegisterFile({ pool: mssqlPool, xml: xml }))
      .then(srid => res.status(200).send({ "srid": srid }))
      .catch(error => res.status(500).send(`{"error": ${error.message}}`));
  });
});

app.listen(3400);
console.log('Requests Microservice Running on http://localhost:3400');
