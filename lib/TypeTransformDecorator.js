"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("./Decorator"),
    Decorator = _require.Decorator;

/**
 * a decorator that transform the type of the arguments and return value
 * @extends {Decorator}
 */


var TypeTransformDecorator = function (_Decorator) {
  _inherits(TypeTransformDecorator, _Decorator);

  function TypeTransformDecorator() {
    _classCallCheck(this, TypeTransformDecorator);

    var _this = _possibleConstructorReturn(this, (TypeTransformDecorator.__proto__ || Object.getPrototypeOf(TypeTransformDecorator)).call(this));

    _this.beforeFunc = function (func, funcArgs, wrapArgs) {
      var inputTypes = wrapArgs;
      if (wrapArgs.length === funcArgs.length + 1) {
        inputTypes = wrapArgs.slice(0, -1);
      }
      inputTypes.forEach(function (type, index) {
        var transformedData = type(funcArgs[index]);
        if ((typeof transformedData === "undefined" ? "undefined" : _typeof(transformedData)) !== type.name.toLowerCase()) {
          throw new Error("incorrect type of transformed data of input argument index " + index);
        }

        funcArgs[index] = transformedData;
      });
    };

    _this.afterFunc = function (func, funcArgs, wrapArgs) {
      if (funcArgs.length === wrapArgs.length) {
        var returnType = wrapArgs[wrapArgs.length - 1];

        var transformedData = returnType(funcArgs[funcArgs.length - 1]);
        if ((typeof transformedData === "undefined" ? "undefined" : _typeof(transformedData)) !== returnType.name.toLowerCase()) {
          throw new Error("incorrect type of transformed data of return value");
        }
        funcArgs[funcArgs.length - 1] = transformedData;
      }
    };
    return _this;
  }

  /**
   * @override
   * @param {function} func
   * @param  {...any} typeTransformArgs
   * @returns {function} the wrapper function
   * @throws {Error} if func is not a function
   * @throws {Error} if typeArgs is empty
   */


  _createClass(TypeTransformDecorator, [{
    key: "wrap",
    value: function wrap(func) {
      var _get2;

      for (var _len = arguments.length, typeTransformArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        typeTransformArgs[_key - 1] = arguments[_key];
      }

      if (typeTransformArgs.length === 0) {
        throw new Error("lack of typeTransform arguments");
      }

      return (_get2 = _get(TypeTransformDecorator.prototype.__proto__ || Object.getPrototypeOf(TypeTransformDecorator.prototype), "wrap", this)).call.apply(_get2, [this, func].concat(typeTransformArgs));
    }
  }]);

  return TypeTransformDecorator;
}(Decorator);

module.exports = {
  TypeTransformDecorator: new TypeTransformDecorator()
};