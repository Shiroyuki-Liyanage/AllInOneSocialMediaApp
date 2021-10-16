import TwitterAPIController from "./TwitterAPIController";
import FacebookAPIController from "./FacebookAPIController";
import RedditAPIController from "./RedditAPIController";

import { AccountType } from "../Accounts/AccountType";

class APIControllerManager {
  constructor() {
    this.TwitterAPI = new TwitterAPIController();
    this.FacebookAPI = new FacebookAPIController();
    this.RedditAPI = new RedditAPIController();
  }

  async requestContent(accounts) {
    var Content = {};
    for (var accountID in accounts) {
      console.log(accounts[accountID]);
      switch (accounts[accountID].getAccountType()) {
        case AccountType.TWITTER:
          Content[accountID] = await this.TwitterAPI.GetRequest(
            accounts[accountID]
          );
          break;
        case AccountType.REDDIT:
          break;
        case AccountType.FACEBOOK:
          break;
        default:
          console.log("Invalid Account");
          break;
      }
    }
  }
}

export default APIControllerManager;
