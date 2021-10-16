class APIController {
  constructor() {
    if (this.constructor == APIController) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.Account = {};
  }

  async GetRequest() {
    throw new Error("Method 'GetRequest()' must be implemented.");
  }

  GetAccount() {
    return this.Account;
  }
}

export default APIController;
