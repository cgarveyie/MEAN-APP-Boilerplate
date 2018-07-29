'use strict';

// --------------------------------------------------
//  Server
// --------------------------------------------------
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var api = require('./routes/api');
var app = express();

//Server PORT
var PORT = 4300;

app.use(bodyParser.json());

//Cors handling
app.use(cors());

//Use API
app.use('/api', api);

//Start Server
app.listen(PORT, function () {
    console.log('We are live on ' + PORT + ', ' + 'Proccess: ' + process.pid);
});

module.exports = app;