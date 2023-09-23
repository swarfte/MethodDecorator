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

const decorator = new Decorator();
decorator.before((func, funcArgs, wrapArgs) => {
  console.log(`before : ${wrapArgs[0]}`);
  console.log(`first arg : ${funcArgs[0]}`);
});

decorator.after((func, funcArgs, wrapArgs) => {
  console.log(`after : ${wrapArgs[1]}`);
  console.log(`result : ${funcArgs[funcArgs.length - 1]}`);
});
add = decorator.wrap(add, "hello world", "goodbye world");

let result = add(1, "2", 3, true);
console.log(typeof result);
