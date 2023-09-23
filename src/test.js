const { Decorator, LogDecorator, TypeCheckDecorator } = require("./index");

Decorator.before((func, funcArgs) => {
  const largest = Math.max(...funcArgs);
  console.log(`the largest number ${largest}`);
}).after((func, funcArgs) => {
  console.log(`the output ${funcArgs.slice(-1)}`);
});

// const sum = Decorator.wrap((...args) => {
//   return args.reduce((acc, curr) => acc + curr, 0);
// });

// sum(1, 2, 3, 4, 5);

const sub = LogDecorator.wrap((a, b) => a - b, "sub");
sub(2, 3);

const accSub = LogDecorator.wrap((...args) => {
  return args.reduce((acc, curr) => acc - curr, 0);
});

accSub(1, 2, 3, 4);

const accAdd = TypeCheckDecorator.wrap(
  (...args) => {
    return args.reduce((acc, curr) => acc + curr, 0);
  },
  Number,
  Number,
  Number,
  Number,
  Number,
);

console.log(accAdd(1, 2, 3, 4));
