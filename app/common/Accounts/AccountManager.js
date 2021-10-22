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
    // console.log(accountID);
    if (!(accountID in this.Accounts)) {
      return null;
    }
    //console.log(this.Accounts[accountID]);

    return this.Accounts[accountID];
  }

  CheckAccountExist(accountID) {
    return this.GetAccount(accountID) !== null;
  }

  GetAccounts() {
    return this.Accounts;
  }

  async AddAccount(account) {
    this.Accounts[account.accountID] = await account;
  }
}

export default AccountManager;
