// --------------------------------------------------
//  Routes
// --------------------------------------------------
const express = require('express');
const moogoose = require('mongoose');
const db = require('../config/database');
const router = express.Router();
const jwt = require('jsonwebtoken');

import MongoDB from '../config/database/MongoDB';
import UserController from '../controllers/UserController'
const UserCtrl = new UserController();

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
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, '_secret');
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
router.get('*', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;