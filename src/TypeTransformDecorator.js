const { Decorator } = require("./Decorator");

/**
 * a decorator that transform the type of the arguments and return value
 * @extends {Decorator}
 */
class TypeTransformDecorator extends Decorator {
  constructor() {
    super();
    this.beforeFunc = (func, funcArgs, wrapArgs) => {
      let inputTypes = wrapArgs;
      if (wrapArgs.length === funcArgs.length + 1) {
        inputTypes = wrapArgs.slice(0, -1);
      }
      inputTypes.forEach((type, index) => {
        const transformedData = type(funcArgs[index]);
        if (typeof transformedData !== type.name.toLowerCase()) {
          throw new Error(
            `incorrect type of transformed data of input argument index ${index}`,
          );
        }

        funcArgs[index] = transformedData;
      });
    };

    this.afterFunc = (func, funcArgs, wrapArgs) => {
      if (funcArgs.length === wrapArgs.length) {
        const returnType = wrapArgs[wrapArgs.length - 1];

        const transformedData = returnType(funcArgs[funcArgs.length - 1]);
        if (typeof transformedData !== returnType.name.toLowerCase()) {
          throw new Error("incorrect type of transformed data of return value");
        }
        funcArgs[funcArgs.length - 1] = transformedData;
      }
    };
  }

  /**
   * @override
   * @param {function} func
   * @param  {...any} typeTransformArgs
   * @returns {function} the wrapper function
   * @throws {Error} if func is not a function
   * @throws {Error} if typeArgs is empty
   */
  wrap(func, ...typeTransformArgs) {
    if (typeTransformArgs.length === 0) {
      throw new Error("lack of typeTransform arguments");
    }

    return super.wrap(func, ...typeTransformArgs);
  }
}

module.exports = {
  TypeTransformDecorator: new TypeTransformDecorator(),
};
