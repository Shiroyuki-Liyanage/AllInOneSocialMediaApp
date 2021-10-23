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

  CheckAccountExist(accountID) {
    return this.GetAccount(accountID) !== null;
  }

  GetAccounts() {
    return this.Accounts;
  }

  GetTwitterAccounts() {
    var twitterAccounts = {};

    for (var accountID in this.Accounts) {
      if (this.Accounts[accountID].getAccountType() == "Twitter") {
        twitterAccounts[accountID] = this.Accounts[accountID];
      }
    }

    return twitterAccounts;
  }

  GetAmountOfTwitterAcconunts() {
    return Object.keys(this.GetTwitterAccounts()).length;
  }

  GetRedditAccounts() {
    var twitterAccounts = {};

    for (var accountID in this.Accounts) {
      if (this.Accounts[accountID].getAccountType() == "Reddit") {
        twitterAccounts[accountID] = this.Accounts[accountID];
      }
    }

    return twitterAccounts;
  }

  GetAmountOfRedditAcconunts() {
    return Object.keys(this.GetRedditAccounts()).length;
  }

  async AddAccount(account) {
    this.Accounts[account.accountID] = await account;
  }

  RemoveAccountByID(accountID) {
    delete this.Accounts[accountID];
  }

  ClearAccounts() {
    this.Accounts = {};
  }

  IsSame(newAccountManager) {
    for (var accountID in newAccountManager.GetAccounts()) {
      if (!(accountID in this.Accounts)) {
        return false;
      }
    }
    return true;
  }

  SetMuteAccount(accountID, isMuted) {
    if (this.CheckAccountExist(accountID)) {
      this.Accounts[accountID].setMuteAccount(isMuted);
      return true;
    }
    return false;
  }
}

export default AccountManager;
