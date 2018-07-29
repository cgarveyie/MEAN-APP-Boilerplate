'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _ControllerInterface2 = require('../config/interfaces/ControllerInterface');

var _ControllerInterface3 = _interopRequireDefault(_ControllerInterface2);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // --------------------------------------------------
//  User Controller
// --------------------------------------------------


var UserController = function (_ControllerInterface) {
    _inherits(UserController, _ControllerInterface);

    function UserController() {
        _classCallCheck(this, UserController);

        return _possibleConstructorReturn(this, (UserController.__proto__ || Object.getPrototypeOf(UserController)).call(this));
    }

    _createClass(UserController, [{
        key: 'register',
        value: function register(req, res) {
            //Validate
            if (!req.body.password || !req.body.email) {
                return res.status(401).send('Email and password are required!');
            }
            //Encrypt password
            var salt = _bcrypt2.default.genSaltSync(10);
            var hash = _bcrypt2.default.hashSync(req.body.password, salt);

            var user = new _User2.default({
                email: req.body.email,
                password: hash
            });

            _get(UserController.prototype.__proto__ || Object.getPrototypeOf(UserController.prototype), 'db', this).insert('user', user);

            // user.save(function(err, user) {
            //     if (err) {
            //         return res.status(422).send(err);
            //     }
            //     let payload = {
            //         subject: user._id
            //     };
            //     let token = jwt.sign(payload, '_secret');
            //     res.status(200).send({
            //         token
            //     });
            // });
        }
    }, {
        key: 'login',
        value: function login(req, res) {
            var userData = req.body;
            var user = new _User2.default();
            user.getSchema().findOne({
                email: userData.email
            }, function (err, user) {
                if (err) {
                    return res.status(422).send(err);
                }
                if (!user) {
                    res.status(401).send('Invalid email!');
                } else if (!userData.password) {
                    res.status(401).send('Password required!');
                } else {
                    //Hash attemoted password
                    var isMatch = _bcrypt2.default.compareSync(userData.password, user.password);
                    //Check if password matches
                    if (!isMatch) {
                        res.status(401).send('Invalid password!');
                    } else {
                        var payload = {
                            subject: user._id
                        };
                        var token = _jsonwebtoken2.default.sign(payload, '_secret');
                        res.status(200).send({
                            token: token
                        });
                    }
                }
            });
        }
    }]);

    return UserController;
}(_ControllerInterface3.default);

// //Register User
// exports.register = (req, res) => {
//     //Validate
//     if (!req.body.password || !req.body.email) {
//         return res.status(401).send('Email and password are required!');
//     }
//     //Encrypt password
//     let salt = bcrypt.genSaltSync(saltRounds);
//     let hash = bcrypt.hashSync(req.body.password, salt);

//     let user = new User({
//         email: req.body.email,
//         password: hash,
//     });


//     user.save(function(err, user) {
//         if (err) {
//             return res.status(422).send(err);
//         }
//         let payload = { subject: user._id };
//         let token = jwt.sign(payload, '_secret');
//         res.status(200).send({ token });
//     });
// };

// //Login User
// exports.login = (req, res) => {
//     let userData = req.body;
//     User.findOne({
//         email: userData.email
//     }, (err, user) => {
//         if (err) {
//             return res.status(422).send(err);
//         }
//         if (!user) {
//             res.status(401).send('Invalid email!');
//         } else if (!userData.password) {
//             res.status(401).send('Password required!');
//         } else {
//             //Hash attemoted password
//             let isMatch = bcrypt.compareSync(userData.password, user.password);
//             //Check if password matches
//             if (!isMatch) {
//                 res.status(401).send('Invalid password!');
//             } else {
//                 let payload = { subject: user._id };
//                 let token = jwt.sign(payload, '_secret');
//                 res.status(200).send({ token });
//             }
//         }
//     });
// };


exports.default = UserController;