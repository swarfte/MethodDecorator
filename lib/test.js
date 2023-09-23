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

var decorator = new Decorator();
decorator.before(function (func, funcArgs, wrapArgs) {
  console.log("before : " + wrapArgs[0]);
  console.log("first arg : " + funcArgs[0]);
});

decorator.after(function (func, funcArgs, wrapArgs) {
  console.log("after : " + wrapArgs[1]);
  console.log("result : " + funcArgs[funcArgs.length - 1]);
});
add = decorator.wrap(add, "hello world", "goodbye world");

var result = add(1, "2", 3, true);
console.log(typeof result === "undefined" ? "undefined" : _typeof(result));