'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _MongoDB = require('../config/database/MongoDB');

var _MongoDB2 = _interopRequireDefault(_MongoDB);

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _DashboardController = require('../controllers/DashboardController');

var _DashboardController2 = _interopRequireDefault(_DashboardController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// --------------------------------------------------
//  Routes
// --------------------------------------------------
var DB = new _MongoDB2.default();
var router = _express2.default.Router();
var UserCtrl = new _UserController2.default();
var DashboardCtrl = new _DashboardController2.default();

//Verify token
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized request');
    }
    var token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        res.status(401).send('Unauthorized request');
    }
    var payload = _jsonwebtoken2.default.verify(token, '_secret');
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
router.get('/dashboard/users', verifyToken, DashboardCtrl.getUsers);

// --------------------------------------
// Main
// --------------------------------------

//index.html => Angular SPA
router.get('*', function (req, res) {
    res.send('Hello World!');
});

module.exports = router;