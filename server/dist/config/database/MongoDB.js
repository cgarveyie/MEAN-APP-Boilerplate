'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ModelFactory = require('../factories/ModelFactory');

var _ModelFactory2 = _interopRequireDefault(_ModelFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var moogoose = require('mongoose');

var MongoDB = function () {
    function MongoDB() {
        _classCallCheck(this, MongoDB);

        this.host = 'alphadev-xeuzq.mongodb.net/test?retryWrites=true';
        this.user = 'DaMezhi';
        this.password = 'kamagistdani16';

        //Connect to db
        var url = 'mongodb+srv://' + this.user + ':' + this.password + '@' + this.host;
        moogoose.connect(url, function (err) {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Connected to MongoDB');
            }
        });
    }

    _createClass(MongoDB, [{
        key: 'insert',
        value: function insert(to, data) {
            //Get model instance 
            var model = new _ModelFactory2.default(to);

            if (!model) {
                throw new Error('Error occured, model not exist');
            }

            var schema = model.getSchema();

            try {
                schema.save(function (err, _res) {
                    if (err) {
                        throw new Error('Error occured, can not insert data to ' + model.getName());
                    }

                    return _res;
                });
            } catch (error) {
                console.error(error);
            }
        }
    }]);

    return MongoDB;
}();

exports.default = MongoDB;