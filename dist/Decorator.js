"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Decorator = function () {
  function Decorator() {
    _classCallCheck(this, Decorator);

    this.beforeFunc = null;
    this.afterFunc = null;
    this.additionalArgs = null;
    this.result = null;
  }

  /**
   * the function that execute before the wrapped function
   * @param {function} func
   */


  _createClass(Decorator, [{
    key: "before",
    value: function before(func) {
      if (typeof func !== "function") {
        throw new Error("beforeFunc must be a function");
      }
      this.beforeFunc = func;
      return this;
    }

    /**
     * the function that execute after the wrapped function
     * @param {function} func
     */

  }, {
    key: "after",
    value: function after(func) {
      if (typeof func !== "function") {
        throw new Error("afterFunc must be a function");
      }
      this.afterFunc = func;
      return this;
    }

    /**
     * wrap the function
     * @param {function} func
     * @returns {any} the result of func
     */

  }, {
    key: "wrap",
    value: function wrap(func) {
      var _this = this;

      if (typeof func !== "function") {
        throw new Error("func must be a function");
      }

      for (var _len = arguments.length, additionalArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        additionalArgs[_key - 1] = arguments[_key];
      }

      this.additionalArgs = additionalArgs;

      this.setup();

      return function () {
        for (var _len2 = arguments.length, funcArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          funcArgs[_key2] = arguments[_key2];
        }

        if (_this.beforeFunc) {
          var _beforeFunc;

          (_beforeFunc = _this.beforeFunc).call.apply(_beforeFunc, [func, func].concat(funcArgs));
        }

        _this.result = func.apply(undefined, funcArgs);

        if (_this.result != null) {
          funcArgs.push(_this.result);
        }

        if (_this.afterFunc) {
          var _afterFunc;

          (_afterFunc = _this.afterFunc).call.apply(_afterFunc, [func, func].concat(funcArgs));
        }
        return _this.result;
      };
    }

    /**
     * use this method to initialize the decorator,
     * use the additionalArgs to pass the arguments to the decorator
     * @abstract
     */

  }, {
    key: "setup",
    value: function setup() {}
  }]);

  return Decorator;
}();

module.exports = {
  AbstractDecorator: Decorator,
  Decorator: new Decorator()
};