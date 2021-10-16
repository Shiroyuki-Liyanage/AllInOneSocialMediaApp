class AccountManager {
  constructor() {
    this.Accounts = {};
  }

  getAccounts() {
    return this.Accounts;
  }

  addAccount(account) {
    this.Accounts[account.accountID] = account;
  }
}

export default AccountManager;
