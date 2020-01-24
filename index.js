const express = require('express');
const path = require('path');
const mssql = require('mssql');
const cors = require('cors'); // npm install --save cors
const bodyParser = require('body-parser'); // npm install --save body-parser
const jwt = require('jsonwebtoken'); // npm install --save jsonwebtoken
const store = require('./store.mssql');

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

const mssql_config = {
    server: "10.106.101.113",
    authentication: { options: { userName: "webuser", password: "mvkMVK$@#1245" }},
    options: { database: "Warehouse", useUTC: false } 
};

var mssqlPool;

(async function() {
  mssqlPool = await new mssql.ConnectionPool(mssql_config).connect();
})();

function authRequest(req) {
  try {
    const JWTToken = req.header('Authorization');
    const decoded = jwt.verify(JWTToken, RSA_PUBLIC_KEY);
    return decoded.sub;
  } catch (exception) {
    return -1;
  }
}

const app = express();

app.use(express.static(path.join(__dirname + '/')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const userId = authRequest(req);
  if (userId) {
    res.send(JSON.stringify({Result: "OK"}));
  } else {
    res.sendStatus(401);
  }
});
//
// Users
//
app.get('/users', function(req, res) {
  let params = Object.assign({}, req.body);
  params.pool = mssqlPool;
  store.users(params)
  .then(result => { res.status(200).send(JSON.stringify(result.recordset))})
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "userId": ''}))});
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
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "userId": ''}))});
});
//
// Clients
//
app.get('/clients', function(req, res) {
  let params = Object.assign({}, req.body);
  params.pool = mssqlPool;
  store.clients(params)
  .then(result => { res.status(200).send(JSON.stringify(result.recordset))})
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "clientId": ''}))});
});
app.post('/clients', function(req, res) {
  let params = Object.assign({}, req.body);
  params.pool = mssqlPool;
  store.clientAddNew(params)
  .then(result => { res.status(200).send(JSON.stringify({ "result": 0, "message": 'Registered', "clientId": result.output.UID }))})
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "clientId": ''}))});
});
app.put('/clients/:id', function(req, res) {
  let params = Object.assign({}, req.body);
  params.pool = mssqlPool;
  store.clientUpdate(params)
  .then(result => { res.status(200).send(JSON.stringify({ "result": 0, "message": 'Updated', "clientId": params.ClientID }))})
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "clientId": ''}))});
});
//
// Authorization
//
app.post('/authorization/', function(req, res) {
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
app.post('/login/', function(req, res) {
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
        expiresIn: 480,
        subject: result.output.UID
      });
      res.status(200).json({idToken: jwtBearerToken, expiresIn: 480, userName: result.output.OriginUserName});
    } else {
      res.sendStatus(401);
    }
  })
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message}))});
});
app.listen(3000);
console.log('Running on http://localhost:3000');
