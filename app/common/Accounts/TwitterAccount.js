import Account from "./Account";
import { AccountType } from "./AccountType";

import TwitterAPIController from "../APIControllers/TwitterAPIController";
import {
  StoreAccountTwitterFollows,
  GetsAccountTwitterFollows,
} from "../StoreData/StoreTwitterData";

class TwitterAccount extends Account {
  constructor(accountID, accountType, accountMuted) {
    super(accountID, accountType, accountMuted);
    this.FollowedAccounts = {};
    this.MaxFollowAccounts = 5;
    this.UserData = {};
  }

  /**
   * Initializes Account with necessary info from API call
   * @returns TwitterAccount
   */
  async InitializeAccount(storedFollowedAccounts) {
    if (typeof storedFollowedAccounts == "undefined") {
      await this.GetStoredAccountFollows();
    } else {
      this.FollowedAccounts = storedFollowedAccounts;
    }
    this.UserData = await this.GetAccountData(this.accountID);
    return this;
  }

  /**
   * Get User follows from storage or API call
   * @returns
   */
  async GetStoredAccountFollows() {
    //First checks if followers already stored in the app
    var userFollows = await GetsAccountTwitterFollows(this.accountID);

    if (userFollows === null) {
      userFollows = await this.RequestTwitterAccountFollows();
    } else if (userFollows["title"] == "Unauthorized") {
      userFollows = await this.RequestTwitterAccountFollows();
    } else {
      //Convert the store data to Json Object
      userFollows = JSON.parse(userFollows);
    }

    //Gets 5 followers from user followers list (TO BE CHANGE)
    for (var follow in userFollows.data) {
      if (Object.keys(this.FollowedAccounts).length >= this.MaxFollowAccounts) {
        return this.FollowedAccounts;
      }

      this.FollowedAccounts[userFollows.data[follow].id] =
        await this.RequestDetailTwitterFollow(userFollows.data[follow].id);
    }
  }

  /**
   * Get twitter followers from API
   * @returns userFollows
   */
  async RequestTwitterAccountFollows() {
    let twitterAPI = new TwitterAPIController();
    try {
      let userFollows = await twitterAPI.GetAccountFollows(this.accountID);
      await StoreAccountTwitterFollows(this.accountID, userFollows);
      return userFollows;
    } catch (error) {
      console.log(error);
    }
  }

  async GetAccountData() {
    let twitterAPI = new TwitterAPIController();
    try {
      let AccountData = await twitterAPI.GetAdvanceUserInfo(
        null,
        this.accountID
      );
      return AccountData;
    } catch (error) {
      console.log(error);
    }
  }

  async RequestDetailTwitterFollow(followerID) {
    let twitterAPI = new TwitterAPIController();
    try {
      return await twitterAPI.GetAdvanceUserInfo(null, followerID);
    } catch (error) {
      console.log(error);
    }
  }

  GetAccountFollows() {
    return this.FollowedAccounts;
  }
}

export default TwitterAccount;
