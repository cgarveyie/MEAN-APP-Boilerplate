// --------------------------------------------------
//  Dashboard Controller
// --------------------------------------------------
const https = require("https");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Get Users
exports.getUsers = (req, res) => {

    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(users);
    });
};