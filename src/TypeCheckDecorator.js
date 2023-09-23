const { Decorator } = require("./Decorator");

/**
 * a decorator that check the type of the arguments and return value
 * @extends {Decorator}
 */
class TypeCheckDecorator extends Decorator {
  constructor() {
    super();

    this.beforeFunc = (func, funcArgs, wrapArgs) => {
      let inputTypes = wrapArgs;
      if (wrapArgs.length === funcArgs.length + 1) {
        inputTypes = wrapArgs.slice(0, -1);
      }

      inputTypes.forEach((type, index) => {
        if (typeof funcArgs[index] !== type.name.toLowerCase()) {
          throw new Error(
            `incorrect type of argument index ${index}, expected ${
              type.name
            }, but got ${typeof funcArgs[index]}`,
          );
        }
      });
    };

    this.afterFunc = (func, funcArgs, wrapArgs) => {
      if (funcArgs.length === wrapArgs.length) {
        const returnType = wrapArgs[wrapArgs.length - 1];
        if (
          typeof funcArgs[funcArgs.length - 1] !== returnType.name.toLowerCase()
        ) {
          throw new Error(
            `incorrect type of return, expected ${
              returnType.name
            }, but got ${typeof funcArgs[funcArgs.length - 1]}`,
          );
        }
      }
    };
  }

  /**
   * @override
   * @param {function} func
   * @param  {...any} typeCheckArgs
   * @returns {function} the wrapper function
   * @throws {Error} if func is not a function
   * @throws {Error} if typeArgs is empty
   */
  wrap(func, ...typeCheckArgs) {
    if (typeCheckArgs.length === 0) {
      throw new Error("lack of typeCheck arguments");
    }

    return super.wrap(func, ...typeCheckArgs);
  }
}

module.exports = {
  TypeCheckDecorator: new TypeCheckDecorator(),
};
