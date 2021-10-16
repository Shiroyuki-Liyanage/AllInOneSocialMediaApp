import AccountManager from "./Accounts/AccountManager";
import APIControllerManager from "./APIControllers/APIControllerManager";

class SocialPostManager {
  constructor() {
    this.Accounts = new AccountManager();
    this.APIManager = new APIControllerManager();
  }

  GetAccounts() {
    return this.Accounts;
  }

  requestContent() {
    this.APIManager.requestContent(this.Accounts.getAccounts());
  }
}

export default SocialPostManager;
