'use strict';

// --------------------------------------------------
//  Dashboard Controller
// --------------------------------------------------
var https = require("https");
var jwt = require('jsonwebtoken');
var User = require('../models/user');

//Get Users
exports.getUsers = function (req, res) {

    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
        }
        res.status(200).json(users);
    });
};