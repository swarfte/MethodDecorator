"use strict";

// const { Decorator } = require("./Decorator");

// Decorator.before((func, ...args) => {
//   console.log(`${func.name}`);
//   const largest = Math.max(...args);
//   console.log(`the largest number ${largest}`);
// }).after((func, ...args) => {
//   console.log(`the output ${args.slice(-1)}`);
// });

// const sum = Decorator.wrap((...args) => {
//   return args.reduce((acc, curr) => acc + curr, 0);
// });

// sum(1, 2, 3, 4, 5);

// const { LogDecorator } = require("./LogDecorator");

// const sub = LogDecorator.wrap((a, b) => a - b, "sub");
// sub(2, 3);

var _require = require("./TypeCheckDecorator"),
    TypeCheckDecorator = _require.TypeCheckDecorator;

var accAdd = TypeCheckDecorator.wrap(function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
}, Number, Number, Number, Number, String);

console.log(accAdd(1, 2, 3, 4));