class Decorator {
  constructor() {
    this.beforeFunc = null;
    this.afterFunc = null;
    this.additionalArgs = null;
    this.result = null;
  }

  /**
   * the function that execute before the wrapped function
   * @param {function} func
   */
  before(func) {
    if (typeof func !== "function") {
      throw new Error("beforeFunc must be a function");
    }
    this.beforeFunc = func;
    return this;
  }

  /**
   * the function that execute after the wrapped function
   * @param {function} func
   */
  after(func) {
    if (typeof func !== "function") {
      throw new Error("afterFunc must be a function");
    }
    this.afterFunc = func;
    return this;
  }

  /**
   * wrap the function
   * @param {function} func
   * @returns {any} the result of func
   */
  wrap(func, ...additionalArgs) {
    if (typeof func !== "function") {
      throw new Error("func must be a function");
    }
    this.additionalArgs = additionalArgs;

    this.setup();

    return (...funcArgs) => {
      if (this.beforeFunc) {
        this.beforeFunc.call(func, func, ...funcArgs);
      }

      this.result = func(...funcArgs);

      if (this.result != null) {
        funcArgs.push(this.result);
      }

      if (this.afterFunc) {
        this.afterFunc.call(func, func, ...funcArgs);
      }
      return this.result;
    };
  }

  /**
   * use this method to initialize the decorator,
   * use the additionalArgs to pass the arguments to the decorator
   * @abstract
   */
  setup() {}
}

module.exports = {
  AbstractDecorator: Decorator,
  Decorator: new Decorator(),
};
