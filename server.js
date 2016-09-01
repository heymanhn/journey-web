/*jslint node: true */

/*
 * Simple web server for Journey web frontend
 */

'use strict';
let express = require('express');
let fs = require('fs');
let https = require('https');
let http = require('http');
let path = require('path');

let app = express();
app.set('port', (process.env.PORT || 3010));
app.use(express.static('app'));

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

// Disable for now since we will be running on HTTP
// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };
// app.server = https.createServer(options, app);

app.server = http.createServer(app);
app.server.listen(app.get('port'), () => {
  console.log('Server started: https://localhost:' + app.get('port') + '/');
});
