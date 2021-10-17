import Account from "./Account";

import TwitterAPIController from "../APIControllers/TwitterAPIController";
import {
  StoreAccountTwitterFollows,
  GetsAccountTwitterFollows,
} from "../StoreData/StoreTwitterData";

class TwitterAccount extends Account {
  constructor(accountID, accountType) {
    super(accountID, accountType);
    this.FollowedAccounts = {};
    this.MaxFollowAccounts = 5;
    this.GetStoredAccountFollows();
  }

  /**
   * Get User follows from storage or API call
   * @returns
   */
  async GetStoredAccountFollows() {
    //First checks if followers already stored in the app
    var userFollows = await GetsAccountTwitterFollows(this.accountID);

    //If not, request from twitter API
    if (userFollows === null) {
      userFollows = await this.RequestTwitterAccountFollows();
    } else {
      //Convert the store data to Json Object
      userFollows = JSON.parse(userFollows);
    }

    for (var follow in userFollows.data) {
      if (Object.keys(this.FollowedAccounts).length >= 5) {
        return this.FollowedAccounts;
      }
      this.FollowedAccounts[userFollows.data[follow].id] =
        userFollows.data[follow];
      console.log(userFollows.data[follow]);
    }
  }

  /**
   * Get twitter followers from API
   * @returns userFollows
   */
  async RequestTwitterAccountFollows() {
    console.log("Call API");
    var twitterAPI = new TwitterAPIController();
    try {
      var userFollows = await twitterAPI.GetAccountFollows(this.accountID);
      await StoreAccountTwitterFollows(this.accountID, userFollows);
      return userFollows;
    } catch (error) {
      console.log(error);
    }
  }

  GetAccountFollows() {
    return this.FollowedAccounts;
  }
}

export default TwitterAccount;
