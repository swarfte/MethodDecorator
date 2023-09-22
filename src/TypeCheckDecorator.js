const { AbstractDecorator } = require("./Decorator");

class TypeCheckDecorator extends AbstractDecorator {
  constructor() {
    super();

    this.beforeFunc = (func, ...funcArgs) => {
      if (this.additionalArgs === null) {
        throw new Error("no type specified");
      }

      const inputTypes = this.additionalArgs.slice(0, -1);
      if (inputTypes.length !== funcArgs.length) {
        throw new Error("incorrect number of arguments");
      }

      // console.log(`input types: ${funcArgs}`);
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

    this.afterFunc = (func, ...funcArgs) => {
      if (this.additionalArgs === null) {
        throw new Error("no type specified");
      }
      const returnType = this.additionalArgs.slice(-1)[0];

      if (typeof funcArgs.slice(-1)[0] !== returnType.name.toLowerCase()) {
        throw new Error(
          `incorrect type of return, expected ${
            returnType.name
          }, but got ${typeof funcArgs.slice(-1)[0]}`,
        );
      }
    };
  }
}

module.exports = {
  TypeCheckDecorator: new TypeCheckDecorator(),
};
