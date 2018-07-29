"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MongoDB = require("../database/MongoDB");

var _MongoDB2 = _interopRequireDefault(_MongoDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ControllerInterface = function ControllerInterface() {
    _classCallCheck(this, ControllerInterface);

    this.db = new _MongoDB2.default();
};

exports.default = ControllerInterface;