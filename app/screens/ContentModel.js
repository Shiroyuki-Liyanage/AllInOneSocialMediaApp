import SocialPost from "./components/SocialPost";

import SocialPostManager from "../common/SocialPostManager";
import TwitterAccount from "../common/Accounts/TwitterAccount";
import { AccountType } from "../common/Accounts/AccountType";

import { CreateTwitterSocialPosts } from "../common/SocialPosts/CreateTwitterSocialPosts";

class ContentModel {
  constructor() {
    this.Content = [];
    this.PostManager = new SocialPostManager();
  }

  async AddAccount(accounts) {
    // await this.PostManager.GetAccountManager().AddAccount(
    //   await new TwitterAccount(
    //     "2401655624",
    //     AccountType.TWITTER
    //   ).InitializeAccount()
    // );
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
