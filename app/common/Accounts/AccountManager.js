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

  AddAccount(account) {
    this.Accounts[account.accountID] = account;
  }
}

export default AccountManager;
