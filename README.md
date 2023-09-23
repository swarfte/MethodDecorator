# MethodDecorator

A decorator that can add more action when execute the function

## Install

`npm install method-decorator`

## Usage

There are serveral ways to use this decorator

### Decorator

- the general decorator

- need to create a new Decorator instance

- need to define before and after function\*

example:

```javascript
let add = (...args) => {
  return args.reduce((acc, cur) => acc + cur, 0);
};

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
add(1, 2, 3, 4);

/**
 * before : hello world
 * first arg : 1
 * after : goodbye world
 * result : 10
 */
```

### LogDecorator

- the Decorator that use to log the parameter and return value

- need to set the label when use wrap function

- example:

```javascript
let add = (...args) => {
  return args.reduce((acc, cur) => acc + cur, 0);
};

add = LogDecorator.wrap(add, "myAdd");
add(1, 2, 3, 4);

/**
 * [myAdd] input: [1,2,3,4]
 * [myAdd] output: [10]
 */
```

### TypeCheckDecorator

- the Decorator that use to check the type of parameter

- need to set the type of parameter when use wrap function

- if the number of wrap arguments is larger than the number of function arguments, the first additional argument will be the type check of return value

- example:

```javascript
let add = (...args) => {
  return args.reduce((acc, cur) => acc + cur, 0);
};

add = TypeCheckDecorator.wrap(add, Number, Number, Number, Number, Number);
add(1, "2", 3, 4);
/**
 * Error: incorrect type of argument index 1, expected Number, but got string
 */
```

### TypeTransformDecorator

- the Decorator that use to transform the type of parameter
- need to set the type of parameter when use wrap function
- if the number of wrap arguments is larger than the number of function arguments, the first additional argument will be the type transform of return value
- example:

```javascript
let add = (...args) => {
  return args.reduce((acc, cur) => acc + cur, 0);
};

add = TypeTransformDecorator.wrap(add, Number, Number, Number, Number, String);
let result = add(1, true, 3, 4);
console.log(result);
console.log(typeof result);

/**
 * 9
 * String
 */
```
