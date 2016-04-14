var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express()
var backApp = express()

var PORT = process.env.PORT || 3000
var frontPORT = 8080

var router = require(__dirname + '/routes/router')

app.use(express.static(__dirname + '/build'))

backApp.use(bodyParser.json())
backApp.use(router)

backApp.listen(PORT, function() {
  console.log('Server started on port ' + PORT)
})

app.listen(frontPORT, function() {
  console.log('Front-end server started on port ' + frontPORT)
})
