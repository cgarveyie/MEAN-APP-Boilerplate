'use strict';

var _MongoDB = require('../config/database/MongoDB');

var _MongoDB2 = _interopRequireDefault(_MongoDB);

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// --------------------------------------------------
//  Routes
// --------------------------------------------------
var express = require('express');
var moogoose = require('mongoose');
var db = require('../config/database');
var router = express.Router();
var jwt = require('jsonwebtoken');

var UserCtrl = new _UserController2.default();

//Connect to db
// moogoose.connect(db.url, err => {
//     if (err) {
//         console.log('Error: ' + err);
//     } else {
//         console.log('Connected to MongoDB');
//     }
// });

//Verify token
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized request');
    }
    var token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        res.status(401).send('Unauthorized request');
    }
    var payload = jwt.verify(token, '_secret');
    if (!payload) {
        res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

// --------------------------------------
// Auth
// --------------------------------------

//__User
router.post('/register', UserCtrl.register);
router.post('/login', UserCtrl.login);

//__Dashboard
// router.get('/dashboard/users', verifyToken, DashboardController.getUsers)

// --------------------------------------
// Main
// --------------------------------------

//index.html => Angular SPA
router.get('*', function (req, res) {
    res.send('Hello World!');
});

module.exports = router;