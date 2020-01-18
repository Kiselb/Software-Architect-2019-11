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

function validateUser(name, password) {
  if (name == 'client' && password == '12345') return true;
  if (name == 'admin' && password == '12345') return true;
  return false;
}
function userIdByName(name) {
  if (name == 'client') return '1000';
  return '2000';
}
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
  if (userId > 0){
    console.log("Authorized");
    res.send(JSON.stringify({Result: "OK"}));
  } else {
    res.sendStatus(401);
  }
});
//
// Clients
//
app.post('/clients', function(req, res) {
  let params = Object.assign({}, req.body);
  params.pool = mssqlPool;
  store.clientAddNew(params)
  .then(result => { res.status(200).send(JSON.stringify({ "result": 0, "message": 'Registered', "clientId": result.output.UID }))})
  .catch(error => { res.status(500).send(JSON.stringify({ "result": -1, "message": error.message, "clientId": ''}))});
});
//
// Authorization
//
app.post('/login/', function(req, res){
  const name = req.body.name;
  const password = req.body.password;

  if (validateUser(name, password)) {
    const userId = userIdByName(name);
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 480,
      subject: userId
    });
    res.status(200).json({idToken: jwtBearerToken, expiresIn: 480});
  } else {
    res.sendStatus(401);
  }
})
app.listen(3000);
console.log('Running on http://localhost:3000');
