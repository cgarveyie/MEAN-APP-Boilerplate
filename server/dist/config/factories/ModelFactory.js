"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FactoryInterface2 = require("../interfaces/FactoryInterface");

var _FactoryInterface3 = _interopRequireDefault(_FactoryInterface2);

var _user = require("../../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModelFactory = function (_FactoryInterface) {
    _inherits(ModelFactory, _FactoryInterface);

    function ModelFactory(model) {
        var _ret;

        _classCallCheck(this, ModelFactory);

        var _this = _possibleConstructorReturn(this, (ModelFactory.__proto__ || Object.getPrototypeOf(ModelFactory)).call(this));

        return _ret = ModelFactory.create(model), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ModelFactory, null, [{
        key: "create",
        value: function create(model) {

            switch (model) {
                case 'user':
                    return new _user2.default();
                    break;
                default:
                    return null;
                    break;
            }
        }
    }]);

    return ModelFactory;
}(_FactoryInterface3.default);

exports.default = ModelFactory;