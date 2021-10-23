class APIController {
  constructor() {
    if (this.constructor == APIController) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  async GetRequest() {
    throw new Error("Method 'GetRequest()' must be implemented.");
  }
}

export default APIController;
