const { DecoratorClass } = require("./Decorator");

/**
 * a decorator that log the input and output of the function
 * @extends {DecoratorClass}
 */
class LogDecorator extends DecoratorClass {
  constructor() {
    super();
    this.beforeFunc = (func, funcArgs, wrapArgs) => {
      console.log(`[${wrapArgs[0]}] input: [${funcArgs}]`);
    };
    this.afterFunc = (func, funcArgs, wrapArgs) => {
      console.log(`[${wrapArgs}] return: [${funcArgs.slice(-1)}]`);
    };
  }

  /**
   * @override
   * @param {function} func
   * @param {string} label , default to func.name
   * @returns {function} the wrapper function
   * @throws {Error} if func is not a function
   * @throws {Error} if label is not a string
   */
  wrap(func, label = "log") {
    if (typeof label !== "string") {
      throw new Error("label must be a string");
    }
    return super.wrap(func, label);
  }
}

module.exports = {
  LogDecorator: new LogDecorator(),
};
