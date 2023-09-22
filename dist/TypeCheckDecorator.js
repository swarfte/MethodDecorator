"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("./Decorator"),
    AbstractDecorator = _require.AbstractDecorator;

var TypeCheckDecorator = function (_AbstractDecorator) {
  _inherits(TypeCheckDecorator, _AbstractDecorator);

  function TypeCheckDecorator() {
    _classCallCheck(this, TypeCheckDecorator);

    var _this = _possibleConstructorReturn(this, (TypeCheckDecorator.__proto__ || Object.getPrototypeOf(TypeCheckDecorator)).call(this));

    _this.beforeFunc = function (func) {
      for (var _len = arguments.length, funcArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        funcArgs[_key - 1] = arguments[_key];
      }

      if (_this.additionalArgs === null) {
        throw new Error("no type specified");
      }

      var inputTypes = _this.additionalArgs.slice(0, -1);
      if (inputTypes.length !== funcArgs.length) {
        throw new Error("incorrect number of arguments");
      }

      // console.log(`input types: ${funcArgs}`);
      inputTypes.forEach(function (type, index) {
        if (_typeof(funcArgs[index]) !== type.name.toLowerCase()) {
          throw new Error("incorrect type of argument index " + index + ", expected " + type.name + ", but got " + _typeof(funcArgs[index]));
        }
      });
    };

    _this.afterFunc = function (func) {
      for (var _len2 = arguments.length, funcArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        funcArgs[_key2 - 1] = arguments[_key2];
      }

      if (_this.additionalArgs === null) {
        throw new Error("no type specified");
      }
      var returnType = _this.additionalArgs.slice(-1)[0];

      if (_typeof(funcArgs.slice(-1)[0]) !== returnType.name.toLowerCase()) {
        throw new Error("incorrect type of return, expected " + returnType.name + ", but got " + _typeof(funcArgs.slice(-1)[0]));
      }
    };
    return _this;
  }

  return TypeCheckDecorator;
}(AbstractDecorator);

module.exports = {
  TypeCheckDecorator: new TypeCheckDecorator()
};