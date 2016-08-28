/*jslint node: true */

/*
 * Simple web server for Journey web frontend
 */

'use strict'
let express = require('express')
let fs = require('fs')
let https = require('https')
let path = require('path')

let app = express()
app.set('port', (process.env.PORT || 3010))
app.use(express.static('public'))

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

app.server = https.createServer(options, app)
app.server.listen(app.get('port'), () => {
  console.log('Server started: https://localhost:' + app.get('port') + '/')
})
