class AccountManager {
  constructor() {
    this.Accounts = {};
  }

  GetAccountType(accountID) {
    if (!(accountID in this.Accounts)) {
      return null;
    }
    return this.Accounts[accountID].accountType;
  }

  GetAccount(accountID) {
    if (!(accountID in this.Accounts)) {
      return null;
    }
    return this.Accounts[accountID];
  }

  GetAccounts() {
    return this.Accounts;
  }

  async AddAccount(account) {
    this.Accounts[account.accountID] = await account;
  }
}

export default AccountManager;
