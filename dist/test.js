"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require("./index"),
    Decorator = _require.Decorator,
    LogDecorator = _require.LogDecorator,
    TypeCheckDecorator = _require.TypeCheckDecorator,
    TypeTransformDecorator = _require.TypeTransformDecorator;

// example


var add = function add() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
};
add = LogDecorator.wrap(add, "first");
add = TypeCheckDecorator.wrap(add, Number, Number, Number, Number, Number);
add = TypeTransformDecorator.wrap(add, Number, Number, Number, Number, String);
add = LogDecorator.wrap(add, "second");
// add = LogDecorator.wrap(add, "typeCheck");
var result = add(1, "2", 3, true);
console.log(typeof result === "undefined" ? "undefined" : _typeof(result));