import AccountManager from "./Accounts/AccountManager";
import APIControllerManager from "./APIControllers/APIControllerManager";

class SocialPostManager {
  constructor() {
    this.Accounts = new AccountManager();
    this.APIManager = new APIControllerManager();
  }

  GetAccountManager() {
    return this.Accounts;
  }

  GetAccounts() {
    return this.Accounts.GetAccounts();
  }

  async requestContent() {
    return await this.APIManager.requestContent(this.Accounts.GetAccounts());
  }
}

export default SocialPostManager;
