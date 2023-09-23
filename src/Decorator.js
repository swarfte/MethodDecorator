/**
 * @property {function} [before] the function that execute before the wrapped function
 * @property {function} [after] the function that execute after the wrapped function
 * @property {function} [wrap] wrap the function
 */
class Decorator {
  constructor() {
    this.beforeFunc = null;
    this.afterFunc = null;
  }

  /**
   * the function that execute before the wrapped function
   * @param {(func,funcArgs,wrapArgs) => void} func
   * @returns {Decorator}
   * @throws {Error} if func is not a function
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
   * @param {(func,funcArgs,wrapArgs) => void} func
   * @returns {Decorator}
   * @throws {Error} if func is not a function
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
   * @param {function} func the function to be wrapped
   * @param {any[]} wrapArgs the additional arguments for the beforeFunc and afterFunc
   * @returns {function} the wrapper function
   * @throws {Error} if func is not a function
   */
  wrap(func, ...wrapArgs) {
    if (typeof func !== "function") {
      throw new Error("func must be a function");
    }

    /**
     * the wrapper function
     * @param {any[]} funcArgs the arguments for the wrapped function
     * @returns {any} the return value of the wrapped function
     */
    return (...funcArgs) => {
      if (this.beforeFunc) {
        this.beforeFunc.call(func, func, funcArgs, wrapArgs);
      }

      let result = func(...funcArgs);

      funcArgs.push(result);

      if (this.afterFunc) {
        this.afterFunc.call(func, func, funcArgs, wrapArgs);
      }
      return funcArgs[funcArgs.length - 1];
    };
  }
}

module.exports = {
  Decorator,
};
