import SocialPost from "./components/SocialPost";

import SocialPostManager from "../common/SocialPostManager";
import TwitterAccount from "../common/Accounts/TwitterAccount";
import RedditAccount from "../common/Accounts/RedditAccount";
import { AccountType } from "../common/Accounts/AccountType";

import { CreateTwitterSocialPosts } from "../common/SocialPosts/CreateTwitterSocialPosts";

class ContentModel {
  constructor() {
    this.Content = [];
    this.PostManager = new SocialPostManager();
  }

  async AddTwitterAccount(accounts) {
    for (var index in accounts) {
      if (
        !this.PostManager.GetAccountManager().CheckAccountExist(accounts[index])
      ) {
        console.log(accounts[index]);
        await this.PostManager.GetAccountManager().AddAccount(
          await new TwitterAccount(
            accounts[index],
            AccountType.TWITTER
          ).InitializeAccount()
        );
        return true;
      }
    }

    return false;
  }

  async AddRedditAccount(accounts) {
    for (var index in accounts) {
      if (
        !this.PostManager.GetAccountManager().CheckAccountExist(accounts[index])
      ) {
        console.log(accounts[index]);
        await this.PostManager.GetAccountManager().AddAccount(
          await new RedditAccount(
            accounts[index],
            AccountType.REDDIT
          ).InitializeAccount()
        );
        return true;
      }
    }

    return false;
  }

  /**
   * Get recent social media posts
   * @returns
   */
  async GetSocialMediaPosts() {
    this.Content = await this.PostManager.requestContent();
    return this.Content;
  }

  GetPostManager() {
    return this.PostManager;
  }
}

export default ContentModel;
