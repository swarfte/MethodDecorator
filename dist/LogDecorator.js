"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("./Decorator"),
    AbstractDecorator = _require.AbstractDecorator;

var LogDecorator = function (_AbstractDecorator) {
  _inherits(LogDecorator, _AbstractDecorator);

  function LogDecorator() {
    _classCallCheck(this, LogDecorator);

    var _this = _possibleConstructorReturn(this, (LogDecorator.__proto__ || Object.getPrototypeOf(LogDecorator)).call(this));

    _this.label = null;
    _this.beforeFunc = function (func) {
      for (var _len = arguments.length, funcArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        funcArgs[_key - 1] = arguments[_key];
      }

      console.log("[" + _this.label + "] input: [" + funcArgs + "]");
    };
    _this.afterFunc = function (func) {
      for (var _len2 = arguments.length, funcArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        funcArgs[_key2 - 1] = arguments[_key2];
      }

      console.log("[" + _this.label + "] return [" + funcArgs.slice(-1) + "]");
    };
    return _this;
  }

  /**
   * set the label in the log
   * @overload
   */


  _createClass(LogDecorator, [{
    key: "setup",
    value: function setup() {
      if (this.additionalArgs != null && this.additionalArgs.length > 0 && typeof this.additionalArgs[0] === "string") {
        this.label = this.additionalArgs[0];
      }
    }
  }]);

  return LogDecorator;
}(AbstractDecorator);

module.exports = {
  LogDecorator: new LogDecorator()
};