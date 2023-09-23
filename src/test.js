const {
  Decorator,
  LogDecorator,
  TypeCheckDecorator,
  TypeTransformDecorator,
} = require("./index");

// example
let add = (...args) => {
  return args.reduce((acc, cur) => acc + cur, 0);
};
add = LogDecorator.wrap(add, "first");
add = TypeCheckDecorator.wrap(add, Number, Number, Number, Number, Number);
add = TypeTransformDecorator.wrap(add, Number, Number, Number, Number, String);
add = LogDecorator.wrap(add, "second");
// add = LogDecorator.wrap(add, "typeCheck");
let result = add(1, "2", 3, true);
console.log(typeof result);
