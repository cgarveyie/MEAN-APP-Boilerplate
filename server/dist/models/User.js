'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// --------------------------------------------------
//  User Model
// --------------------------------------------------
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// // Set Fields
// var userSchema = new Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// //Create Model instace
// var User = mongoose.model('user', userSchema, 'users');

// //Make Available For Node
// module.exports = User;


var User = function () {
    function User(user) {
        _classCallCheck(this, User);

        this.name = 'User';
        this.email = user ? user.email : null;
        this.password = user ? user.password : null;
    }

    _createClass(User, [{
        key: 'getSchema',
        value: function getSchema() {
            if (!this.schema) {
                var userSchema = new Schema({
                    email: {
                        type: String,
                        required: true
                    },
                    password: {
                        type: String,
                        required: true
                    }
                });

                if (mongoose.models && mongoose.models.User) {
                    this.schema = mongoose.models.User;
                } else {
                    this.schema = mongoose.model('User', userSchema);
                }
            }

            return this.schema;
        }
    }, {
        key: 'setEmail',
        value: function setEmail(email) {
            this.email = email;
            return this;
        }
    }, {
        key: 'setEmail',
        value: function setEmail(password) {
            this.password = password;
            return this;
        }
    }, {
        key: 'getEmail',
        value: function getEmail() {
            return this.email;
        }
    }, {
        key: 'getPassword',
        value: function getPassword() {
            return this.password;
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }]);

    return User;
}();

exports.default = User;