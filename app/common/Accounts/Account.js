import { AccountType } from "./AccountType";

class Account {
  constructor(accountID, accountType) {
    this.accountID = accountID;
    this.accountType = accountType;
    this.muted = false;
  }

  getAccountID() {
    return this.accountID;
  }
  getAccountType() {
    return this.accountType;
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
