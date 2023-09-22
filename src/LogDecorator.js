const { AbstractDecorator } = require("./Decorator");

class LogDecorator extends AbstractDecorator {
  constructor() {
    super();
    this.label = null;
    this.beforeFunc = (func, ...funcArgs) => {
      console.log(`[${this.label}] input: [${funcArgs}]`);
    };
    this.afterFunc = (func, ...funcArgs) => {
      console.log(`[${this.label}] return [${funcArgs.slice(-1)}]`);
    };
  }

  /**
   * set the label in the log
   * @overload
   */
  setup() {
    if (
      this.additionalArgs != null &&
      this.additionalArgs.length > 0 &&
      typeof this.additionalArgs[0] === "string"
    ) {
      this.label = this.additionalArgs[0];
    }
  }
}

module.exports = {
  LogDecorator: new LogDecorator(),
};
