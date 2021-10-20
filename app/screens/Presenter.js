import SocialPost from "./components/SocialPost";

import SocialPostManager from "../common/SocialPostManager";
import TwitterAccount from "../common/Accounts/TwitterAccount";
import { AccountType } from "../common/Accounts/AccountType";

import { CreateTwitterSocialPosts } from "../common/SocialPosts/CreateTwitterSocialPosts";
import { CreateRedditSocialPosts } from "../common/SocialPosts/CreateRedditSocialPost";

import ContentModel from "./ContentModel";
import React from "react";
import { Text } from "react-native";

class Presenter {
  constructor(homeScreen) {
    this.ContentModel = new ContentModel();
    this.HomeScreen = homeScreen;

    //this.AddAccount();
  }

  /**
   * Add Account
   */
  async AddTwitterAccount(accounts) {
    let isNewAccount = await this.ContentModel.AddTwitterAccount(accounts);
    //Refresh posts
    //this.HomeScreen.GetSocialPosts();
    this.RefreshSocialMediaPosts();
    return isNewAccount;
  }

  async AddRedditAccount(accounts) {
    let isNewAccount = await this.ContentModel.AddRedditAccount(accounts);
    //Refresh posts
    //this.HomeScreen.GetSocialPosts();
    this.RefreshSocialMediaPosts();
    return isNewAccount;
  }

  /**
   * Refresh social media posts
   */
  async RefreshSocialMediaPosts() {
    return await this.ContentModel.GetSocialMediaPosts();
  }

  /**
   * Create Social media post components to be displayed
   * @param {*} socialPosts
   * @returns
   */
  CreateSocialPosts(socialPosts) {
    //If no content then don't display anything
    if (Object.keys(socialPosts).length <= 0) {
      return [];
    }

    var Content = [];
    for (var AccountID in socialPosts) {
      switch (
        this.ContentModel.GetPostManager()
          .GetAccountManager()
          .GetAccountType(AccountID)
      ) {
        case AccountType.TWITTER:
          CreateTwitterSocialPosts(
            this.ContentModel.GetPostManager()
              .GetAccountManager()
              .GetAccount(AccountID),
            socialPosts[AccountID],
            Content
          );
          break;
        case AccountType.REDDIT:
          CreateRedditSocialPosts(
            this.ContentModel.GetPostManager()
              .GetAccountManager()
              .GetAccount(AccountID),
            socialPosts[AccountID],
            Content
          );
          break;
        case AccountType.FACEBOOK:
          break;
      }
    }

    //console.log(Content);

    return Content;
  }
}

export default Presenter;
