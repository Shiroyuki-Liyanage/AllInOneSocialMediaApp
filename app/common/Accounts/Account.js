class Account {
  constructor(accountID, accountType) {
    this.accountID = accountID;
    this.accountType = accountType;
    this.muted = false;
  }

  getAccountID() {
    return this.accountID;
  }
  isMuted() {
    return this.muted;
  }
  muteAccount() {
    this.muted = true;
  }
  unMuteAccount() {
    this.muted = false;
  }
}

export default Account;
