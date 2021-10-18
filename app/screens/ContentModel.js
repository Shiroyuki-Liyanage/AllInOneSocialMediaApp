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

  async AddAccount() {
    await this.PostManager.GetAccountManager().AddAccount(
      await new TwitterAccount(
        "2401655624",
        AccountType.TWITTER
      ).InitializeAccount()
    );
    return true;
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
