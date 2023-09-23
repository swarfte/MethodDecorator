"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("./Decorator"),
    DecoratorClass = _require.DecoratorClass;

/**
 * a decorator that check the type of the arguments and return value
 * @extends {DecoratorClass}
 */


var TypeCheckDecorator = function (_DecoratorClass) {
  _inherits(TypeCheckDecorator, _DecoratorClass);

  function TypeCheckDecorator() {
    _classCallCheck(this, TypeCheckDecorator);

    var _this = _possibleConstructorReturn(this, (TypeCheckDecorator.__proto__ || Object.getPrototypeOf(TypeCheckDecorator)).call(this));

    _this.beforeFunc = function (func, funcArgs, wrapArgs) {
      var inputTypes = wrapArgs;
      if (wrapArgs.length === funcArgs.length + 1) {
        inputTypes = wrapArgs.slice(0, -1);
      }

      inputTypes.forEach(function (type, index) {
        if (_typeof(funcArgs[index]) !== type.name.toLowerCase()) {
          throw new Error("incorrect type of argument index " + index + ", expected " + type.name + ", but got " + _typeof(funcArgs[index]));
        }
      });
    };

    _this.afterFunc = function (func, funcArgs, wrapArgs) {
      if (funcArgs.length === wrapArgs.length) {
        var returnType = wrapArgs[wrapArgs.length - 1];
        if (_typeof(funcArgs[funcArgs.length - 1]) !== returnType.name.toLowerCase()) {
          throw new Error("incorrect type of return, expected " + returnType.name + ", but got " + _typeof(funcArgs[funcArgs.length - 1]));
        }
      }
    };
    return _this;
  }

  /**
   * @override
   * @param {function} func
   * @param  {...any} typeCheckArgs
   * @returns {function} the wrapper function
   * @throws {Error} if func is not a function
   * @throws {Error} if typeArgs is empty
   */


  _createClass(TypeCheckDecorator, [{
    key: "wrap",
    value: function wrap(func) {
      var _get2;

      for (var _len = arguments.length, typeCheckArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        typeCheckArgs[_key - 1] = arguments[_key];
      }

      if (typeCheckArgs.length === 0) {
        throw new Error("lack of typeCheck arguments");
      }

      return (_get2 = _get(TypeCheckDecorator.prototype.__proto__ || Object.getPrototypeOf(TypeCheckDecorator.prototype), "wrap", this)).call.apply(_get2, [this, func].concat(typeCheckArgs));
    }
  }]);

  return TypeCheckDecorator;
}(DecoratorClass);

module.exports = {
  TypeCheckDecorator: new TypeCheckDecorator()
};