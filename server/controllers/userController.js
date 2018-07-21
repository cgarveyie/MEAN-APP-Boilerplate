// --------------------------------------------------
//  User Controller
// --------------------------------------------------
const https = require("https");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Register User
exports.register = (req, res) => {

    var user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    user.save(function(err, user) {
        if (err) {
            return res.status(422).send(err);
        }
        let payload = { subject: user._id };
        let token = jwt.sign(payload, '_secret');
        res.status(200).send({ token });
    });
};

//Login User
exports.login = (req, res) => {
    let userData = req.body;

    User.findOne({
        email: userData.email
    }, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (!user) {
            res.status(401).send('Invalid email!');
        } else {
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password!!');
            } else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, '_secret');
                res.status(200).send({ token });
            }
        }
    });
};