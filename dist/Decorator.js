"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @property {function} [before] the function that execute before the wrapped function
 * @property {function} [after] the function that execute after the wrapped function
 * @property {function} [wrap] wrap the function
 */
var Decorator = function () {
  function Decorator() {
    _classCallCheck(this, Decorator);

    this.beforeFunc = null;
    this.afterFunc = null;
  }

  /**
   * the function that execute before the wrapped function
   * @param {function} func
   * @returns {Decorator}
   * @throws {Error} if func is not a function
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
     * @returns {Decorator}
     * @throws {Error} if func is not a function
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
     * @param {function} func the function to be wrapped
     * @param {any[]} wrapArgs the additional arguments for the beforeFunc and afterFunc
     * @returns {function} the wrapper function
     * @throws {Error} if func is not a function
     */

  }, {
    key: "wrap",
    value: function wrap(func) {
      var _this = this;

      for (var _len = arguments.length, wrapArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        wrapArgs[_key - 1] = arguments[_key];
      }

      if (typeof func !== "function") {
        throw new Error("func must be a function");
      }

      /**
       * the wrapper function
       * @param {any[]} funcArgs the arguments for the wrapped function
       * @returns {any} the return value of the wrapped function
       */
      return function () {
        for (var _len2 = arguments.length, funcArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          funcArgs[_key2] = arguments[_key2];
        }

        if (_this.beforeFunc) {
          _this.beforeFunc.call(func, func, funcArgs, wrapArgs);
        }

        var result = func.apply(undefined, funcArgs);

        funcArgs.push(result);

        if (_this.afterFunc) {
          _this.afterFunc.call(func, func, funcArgs, wrapArgs);
        }
        return funcArgs[funcArgs.length - 1];
      };
    }
  }]);

  return Decorator;
}();

module.exports = {
  DecoratorClass: Decorator,
  Decorator: new Decorator()
};