const { DecoratorClass } = require("./Decorator");

/**
 * a decorator that check the type of the arguments and return value
 * @extends {DecoratorClass}
 */
class TypeCheckDecorator extends DecoratorClass {
  constructor() {
    super();

    this.beforeFunc = (func, funcArgs, wrapArgs) => {
      const inputTypes = wrapArgs.slice(0, -1);
      if (inputTypes.length !== funcArgs.length) {
        throw new Error("incorrect number of arguments");
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
      const returnType = wrapArgs.slice(-1)[0];

      if (typeof funcArgs.slice(-1)[0] !== returnType.name.toLowerCase()) {
        throw new Error(
          `incorrect type of return, expected ${
            returnType.name
          }, but got ${typeof funcArgs.slice(-1)[0]}`,
        );
      }
    };
  }

  /**
   * @override
   * @param {function} func
   * @param  {...any} typeArgs
   * @returns {function} the wrapper function
   * @throws {Error} if func is not a function
   * @throws {Error} if typeArgs is empty
   */
  wrap(func, ...typeArgs) {
    if (typeArgs.length === 0) {
      throw new Error("lack of type arguments");
    }

    return super.wrap(func, ...typeArgs);
  }
}

module.exports = {
  TypeCheckDecorator: new TypeCheckDecorator(),
};
