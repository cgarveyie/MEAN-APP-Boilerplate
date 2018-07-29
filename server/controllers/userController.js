// --------------------------------------------------
//  User Controller
// --------------------------------------------------
import https from 'https';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ControllerInterface from "../config/interfaces/ControllerInterface";
import User from "../models/User";

export default class UserController extends ControllerInterface {

    constructor() {
        super();
    }

    register(req, res) {
        //Validate
        if (!req.body.password || !req.body.email) {
            return res.status(401).send('Email and password are required!');
        }
        //Encrypt password
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        let user = new User({
            email: req.body.email,
            password: hash,
        });

        user.save(function(err, user) {
            if (err) {
                return res.status(422).send(err);
            }
            let payload = {
                subject: user._id
            };
            let token = jwt.sign(payload, '_secret');
            res.status(200).send({
                token
            });
        });
    }


    login(req, res) {
        let userData = req.body;
        User.findOne({
            email: userData.email
        }, (err, user) => {
            if (err) {
                return res.status(422).send(err);
            }
            if (!user) {
                res.status(401).send('Invalid email!');
            } else if (!userData.password) {
                res.status(401).send('Password required!');
            } else {
                //Hash attemoted password
                let isMatch = bcrypt.compareSync(userData.password, user.password);
                //Check if password matches
                if (!isMatch) {
                    res.status(401).send('Invalid password!');
                } else {
                    let payload = {
                        subject: user._id
                    };
                    let token = jwt.sign(payload, '_secret');
                    res.status(200).send({
                        token
                    });
                }
            }
        });
    }
}