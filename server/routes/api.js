// --------------------------------------------------
//  Routes
// --------------------------------------------------
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import express from 'express';
import MongoDB from '../config/database/MongoDB';
import UserController from '../controllers/UserController'
import DashboardController from '../controllers/DashboardController';

const DB = new MongoDB();
const router = express.Router();
const UserCtrl = new UserController();
const DashboardCtrl = new DashboardController();

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
router.get('/dashboard/users', verifyToken, DashboardCtrl.getUsers)

// --------------------------------------
// Main
// --------------------------------------

//index.html => Angular SPA
router.get('*', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;