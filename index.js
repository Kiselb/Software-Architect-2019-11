const express = require('express');
const axios = require('axios');                   // npm install axios
const path = require('path');
const mssql = require('mssql');
const cors = require('cors');                     // npm install --save cors
const bodyParser = require('body-parser');        // npm install --save body-parser
const jwt = require('jsonwebtoken');              // npm install --save jsonwebtoken
const fileUpload = require('express-fileupload'); // npm install --save express-fileupload
const webPush = require('web-push');              // npm install --save web-push
const FormData = require('form-data');            //npm install --save form-data

// https://app.sendgrid.com/email_activity?filters=%22%22&isAndOperator=true
// Kiselb MVK$73582
// const sgMail = require('@sendgrid/mail'); // npm install --save @sendgrid/mail

const config = require('./config.json');

const store = require('./store.mssql');
const xlsx = require('./import.xlsx');

const RSA_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgHA9IScOQDRSd/pGYTZsq5juAZ+f+qpknJDD5XnhLf9Ppfmu8Fw6
vwcJmeFJnDVRsvw/QS6DDg92hiJPCj2kJ1cElTbDIABGNGE/RqQ3CZiwoJVABOOb
pS8cKIcmyyd3iYiS8bIUlQJ+8lsn4cblOS+2rik0lQvt/w+WTXCB9mmZAgMBAAEC
gYAXfePzfbsYeG5eNt7f+kzMPHyggWaAxYAzmJzuLqBnAK+3m9L5Kt6SxYKssbB9
RHVW8JJe/tUxjVgz1CFLl5EYD9cAUoDleFLmblTK771gaJFWKz2eN/VpYmVxIBH1
fF3kBo5SoZNaFj6w38XSyiWLz7m6LhWz6HUzSqebqle8AQJBANLz51723Fmi9Vdt
QaMO4JMmYTJmofJcInodBDpdQvgPGzEVQlUSTwRRTeqotUBe0Bbne1ldqCDI3A9S
UnTU2IECQQCINNtHi9lq2n3a6VsHPG3DTXkdNKvmGKGV9GDV3Tm5xjqcU19FRLWA
jKafGOIqeUCQWbUxwj4Uq5PP77VVksUZAkEAozoirzJocdtL52gcv6TFVFcAIlWT
vcpYyxAks1xycyqNKb9/YgAWsAqRNZ9xD+vNK8vVf+KeMy/4Rsq2DrybAQJALYeV
oRXjaG9+0HVew01012sHSDb6GyEyqmCVGggoKqxTnTvVRd9Q2Jarf9UejNoZNed2
xRpMDDbKYyCaue8kyQJBAM6AxfO2inAmmGWvcMdnT4uqvw6mgN2zi1KdVeptY7V1
HESG0IvA7z7GlVJPezI1VdD5ONs7s83P6giBx2lgRqE=
-----END RSA PRIVATE KEY-----`

const RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHA9IScOQDRSd/pGYTZsq5juAZ+f
+qpknJDD5XnhLf9Ppfmu8Fw6vwcJmeFJnDVRsvw/QS6DDg92hiJPCj2kJ1cElTbD
IABGNGE/RqQ3CZiwoJVABOObpS8cKIcmyyd3iYiS8bIUlQJ+8lsn4cblOS+2rik0
lQvt/w+WTXCB9mmZAgMBAAE=
-----END PUBLIC KEY-----`

const publicVapidKey = "BHZR7gUHJwp6FcZG4gPmuB8zPk6YZmdGN74MBVLfCZCLDwzQoSPdb0gTbpJJ_KzzZ3Fq-CZU-1wOKMzlIHXUWHc";
const privateVapidKey = "ObceMkqK2e1_irMbTsAn8bbsEtgGh2LBhSfgiTPQQKM";

const SENDGRID_API_KEY = "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";
var emailAddressCounter = 1;
webPush.setVapidDetails('mailto:wfw311@hotmail.com', publicVapidKey, privateVapidKey);

//sgMail.setApiKey(SENDGRID_API_KEY);

const mssql_config = {
    //server: "10.106.101.113",
    //server: "172.27.0.2",
    server: config.db.host,
    database: "Warehouse",
    authentication: { options: { userName: "webuser", password: "mvkMVKp!@#$1234" }},
    options: { database: "Warehouse", useUTC: false } 
};

var mssqlPool;

(async function() {
  console.log("Try to connect on MS SQL Server");
  mssqlPool = await new mssql.ConnectionPool(mssql_config).connect();
  console.log("MS SQL Server connected successfully");
})();

function authRequest(req) {
  try {
    const JWTToken = req.header('Authorization');
    const decoded = jwt.verify(JWTToken, RSA_PUBLIC_KEY);
    console.log(`Auth Request Token: ${JWTToken}`);
    return decoded.sub;
  } catch (exception) {
    console.log(exception);
    return -1;
  }
}

function authorizationCheck(userId, permissionId) {
  const params = {
    userId: userId,
    permissionId: permissionId,
    pool: mssqlPool,
  }
  return new Promise((resolve, reject) => {
    store.getPermission(params)
    .then(result => {
      if (result.returnValue === 0) {
        resolve();
      } else {
        reject({ access: "denied"});
      }
    })
  });
}

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const userId = authRequest(req);
  console.log(userId);
  if (userId) {
    res.send(JSON.stringify({Result: "OK"}));
  } else {
    res.sendStatus(401);
  }
});
//
// Authorization
//
app.post('/authorization', function(req, res) {
  const userId = authRequest(req);
  if (userId) {
    let params = Object.assign({}, req.body);
    params.pool = mssqlPool;
    params.userId = userId;
    store.authorization(params)
    .then(result => { res.status(200).send(JSON.stringify(result.recordset))})
    .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message}))});
  } else {
    res.sendStatus(401);
  }
});
//
// Authentication
//
app.post('/login', function(req, res) {
  const name = req.body.name;
  const password = req.body.password;

  let params = Object.assign({}, req.body);
  params.pool = mssqlPool;
  params.name = req.body.name;
  params.password = req.body.password;
  store.authentication(params)
  .then(result => {
    if (result.output.UID) {
      const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 480000000,
        subject: result.output.UID
      });
      res.status(200).json({idToken: jwtBearerToken, expiresIn: 480000000, userName: result.output.OriginUserName});
    } else {
      res.sendStatus(401);
    }
  })
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message}))});
});
//
// Users
//
app.get('/users', function(req, res) {
  let params = Object.assign({}, req.body);
  params.pool = mssqlPool;
  authorizationCheck(authRequest(req), '2BD877D3-AD0E-4404-86B8-6F7E252DEFD8')
  .then(() => store.users(params))
  .then(result => { res.status(200).send(JSON.stringify(result.recordset))})
  .catch(error => {
    if (error.access) {
      res.status(401).send(JSON.stringify({ "result": -1, "message": "Access denied", "userId": ''}));
    } else {
      res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "userId": ''}))
    }
  });
});
app.post('/users', function(req, res) {
  let params = Object.assign({}, req.body);
  params.pool = mssqlPool;
  store.userAddNew(params)
  .then(result => { res.status(200).send(JSON.stringify({ "result": 0, "message": 'Registered', "userId": result.output.UID }))})
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "userId": ''}))});
});
app.put('/users/:userId/status', function(req, res) {
  const params = {
    pool: mssqlPool,
    userId: req.params.userId,
    status: req.body.status,
  }
  store.userSetStatus(params)
  .then(result => { res.status(200).send(JSON.stringify({ "result": 0, "message": 'Status updated', "userId": params.userId }))})
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "userId": params.userId}))});
});
app.post('/subscribe', function(req, res) {
  console.log('Push subscribing: Call push microservice');
  
  const userId = authRequest(req);
  const subscription = req.body;

  console.log(userId);

  //axios.post('http://localhost:3500/subscribe', { subscription: subscription, userId: userId})
  //axios.post('http://172.27.0.8:3500/subscribe', { subscription: req.body, userId: userId})
  axios.post(`${config.notification.host}:3500/subscribe`, { subscription: req.body, userId: userId})
  .then(response => {
    console.log(`Status Code: ${response.status}`);
    res.status(201).json({ "result": 0, "message": JSON.stringify(subscription), "userId": userId});
  })
  .catch(error => {
    console.log(error.message);
    res.status(500).json({ "result": -1, "message": error, "userId": userId});
  });
});
//
// Clients
//
app.get('/clients', function(req, res) {
  const userId = authRequest(req);
  console.log(`User ID: ${userId}`);

  //axios.get(`http://localhost:3600/clients`)
  //axios.get(`http://172.27.0.9:3600/clients`)
  axios.get(`${config.clients.host}:3600/clients`)
  .then(response => res.status(200).send(response.data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message, "userId": ''}));
});
app.post('/clients', function(req, res) {
  //axios.post(`http://localhost:3600/clients`, req.body)
  //axios.post(`http://172.27.0.9:3600/clients`, req.body)
  axios.post(`${config.clients.host}:3600/clients`, req.body)
  .then(response => res.status(200).send(response.uid))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message, "userId": ''}));
});
app.put('/clients/:id', function(req, res) {
  const params = Object.assign({}, req.body);
  params.uid = req.params.id;
  //axios.put(`http://localhost:3600/clients/${params.uid}`, params)
  //axios.put(`http://172.27.0.9:3600/clients${params.uid}`, params)
  axios.put(`${config.clients.host}:3600/clients${params.uid}`, params)
  .then(result => res.status(200).send({ "result": 0, "message": 'Updated', "clientId": params.uid }))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message, "userId": ''}));
});
//
// Subdivisions
//
app.get('/subdivisions', function(req, res) {
  let params = Object.assign({}, req.body);
  params.pool = mssqlPool;
  store.subdivisions(params)
  .then(result => { res.status(200).send(JSON.stringify(result.recordset))})
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message}))});
});
//
// Service Requests
//
app.get('/requests/types', function(req, res) {
  //axios.get(`http://localhost:3400/requests/types`)
  //axios.get(`http://172.27.0.7:3400/requests/types`)
  axios.get(`${config.sr.host}:3400/requests/types`)
  .then(response => res.status(200).send(response.data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message}));
});
app.post('/requests/upload', function(req, res) {
  // https://stackoverflow.com/questions/54899605/creating-form-data-from-file-object-in-nodejs
  console.log("Upload file redirecting ...");
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded');
  }
  var file = {
    name: req.files.file.name,
    filename: req.files.file.name,
    size: req.files.file.size,
    encoding: req.files.file.encoding,
    tempFilePath: req.files.file.tempFilePath,
    truncated: req.files.file.truncated,
    mimetype: req.files.file.mimetype,
    md5: req.files.file.md5
  }
  var formData = new FormData();
  formData.append('file', Buffer.from(req.files.file.data), file)
  
  formData.append('clientId', req.body.clientId)
  formData.append('subdivisionId', req.body.subdivisionId)
  formData.append('typeId', req.body.typeId)
  formData.append('dueDate', req.body.dueDate)
  formData.append('remarks', req.body.remarks)
  //formData.submit('http://localhost:3400/requests/upload', function(error, response) {
  //  console.log(response.statusCode);
  //});
  //axios.post('http://172.27.0.7:3400/requests/upload', formData, { headers: formData.getHeaders() })
  //axios.post('http://localhost:3400/requests/upload', formData, { headers: formData.getHeaders() })
  axios.post(`${config.sr.host}:3400/requests/upload`, formData, { headers: formData.getHeaders() })
  .then(response => res.status(200).send({"srid": response.data.srid }))
   .catch(error => res.status(500).send(`{"error": ${error.meesage}}`));
});
app.get('/requests', function(req, res) {
  console.log("Get requests redirecting ...");
  //axios.get(`http://172.27.0.7:3400/requests?section=${req.query.section}&criteria=${req.query.criteria}&sortorder=${req.query.sortorder}&sorttype=${req.query.sorttype}&page=${req.query.page}&pagesize=${req.query.pagesize}`)
  //axios.get(`http://localhost:3400/requests?section=${req.query.section}&criteria=${req.query.criteria}&sortorder=${req.query.sortorder}&sorttype=${req.query.sorttype}&page=${req.query.page}&pagesize=${req.query.pagesize}`)
  axios.get(`${config.sr.host}:3400/requests?section=${req.query.section}&criteria=${req.query.criteria}&sortorder=${req.query.sortorder}&sorttype=${req.query.sorttype}&page=${req.query.page}&pagesize=${req.query.pagesize}`)
  .then(response => res.status(200).send(response.data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message}));
});
app.get('/requests/:srid', function(req, res) {
  //axios.get(`http://localhost:3400/requests/${req.params.srid}`)
  //axios.get(`http://172.27.0.7:3400/requests/${req.params.srid}`)
  axios.get(`${config.sr.host}:3400/requests/${req.params.srid}`)
  .then(response => res.status(200).send(response.data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message}));
});
app.put('/requests/:srid', function(req, res) {
  //axios.put(`http://localhost:3400/requests/${req.params.srid}`, req.body)
  //axios.put(`http://172.27.0.7:3400/requests/${req.params.srid}`, req.body)
  axios.put(`${config.sr.host}:3400/requests/${req.params.srid}`, req.body)
  .then(response => res.status(200).send(response.data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message }));
});
app.get('/requests/:srid/details', function(req, res) {
  //axios.get(`http://localhost:3400/requests/${req.params.srid}/details`)
  //axios.get(`http://172.27.0.7:3400/requests/${req.params.srid}/details`)
  axios.get(`${config.sr.host}:3400/requests/${req.params.srid}/details`)
  .then(response => res.status(200).send(response.data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message}));
});
app.put('/requests/:srid/status', function(req, res) {
  console.log("Changing service request status ...");
  const userId = authRequest(req);
  //axios.put(`http://localhost:3400/servicerequests/${req.params.srid}/status`, {
  //axios.put(`http://172.27.0.7:3400/servicerequests/${req.params.srid}/status`, {
  axios.put(`${config.sr.host}:3400/servicerequests/${req.params.srid}/status`, {
    status: req.body.status,
    //statusname: req.body.statusname,
    instructions: req.body.instructions,
    notification: req.body.notification,
    userId: userId
  })
  .then(response => res.status(200).send(response.data))
  .catch(error => res.status(500).send({ "result": -1, "message": error.message}));
});

app.listen(3000);
console.log('Running on http://localhost:3000');
