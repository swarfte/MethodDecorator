"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("./Decorator"),
    Decorator = _require.Decorator;

/**
 * a decorator that log the input and output of the function
 * @extends {Decorator}
 */


var LogDecorator = function (_Decorator) {
  _inherits(LogDecorator, _Decorator);

  function LogDecorator() {
    _classCallCheck(this, LogDecorator);

    var _this = _possibleConstructorReturn(this, (LogDecorator.__proto__ || Object.getPrototypeOf(LogDecorator)).call(this));

    _this.beforeFunc = function (func, funcArgs, wrapArgs) {
      console.log("[" + wrapArgs[0] + "] input: [" + funcArgs + "]");
    };
    _this.afterFunc = function (func, funcArgs, wrapArgs) {
      console.log("[" + wrapArgs + "] return: [" + funcArgs.slice(-1) + "]");
    };
    return _this;
  }

  /**
   * @override
   * @param {function} func
   * @param {string} label , default to func.name
   * @returns {function} the wrapper function
   * @throws {Error} if func is not a function
   * @throws {Error} if label is not a string
   */


  _createClass(LogDecorator, [{
    key: "wrap",
    value: function wrap(func) {
      var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "log";

      if (typeof label !== "string") {
        throw new Error("label must be a string");
      }
      return _get(LogDecorator.prototype.__proto__ || Object.getPrototypeOf(LogDecorator.prototype), "wrap", this).call(this, func, label);
    }
  }]);

  return LogDecorator;
}(Decorator);

module.exports = {
  LogDecorator: new LogDecorator()
};