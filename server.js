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
const env = app.get('env');
app.set('port', (process.env.PORT || 3010));
app.use(express.static('app'));

app.enable('trust proxy');
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }

  return res.redirect(`https://${req.hostname}${req.url}`);
});

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

// Set up the HTTPS server if on dev
if (env === 'development') {
  const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

  app.server = https.createServer(options, app);
} else {
  app.server = http.createServer(app);
}

app.server.listen(app.get('port'), () => {
  const protocol = env === 'development' ? 'https' : 'http';
  console.log(`${protocol} server started at port ${app.get('port')}`);
});
