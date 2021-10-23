import { AccountType } from "./AccountType";

class Account {
  constructor(accountID, accountType, accountMuted) {
    this.accountID = accountID;
    this.accountType = accountType;
    this.muted = accountMuted;
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
  setMuteAccount(isMuted) {
    this.muted = isMuted;
  }
  muteAccount() {
    this.muted = true;
  }
  unMuteAccount() {
    this.muted = false;
  }
}

export default Account;
