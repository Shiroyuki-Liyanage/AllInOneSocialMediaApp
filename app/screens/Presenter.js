import SocialPostManager from "../common/SocialPostManager";
import TwitterAccount from "../common/Accounts/TwitterAccount";
import { AccountType } from "../common/Accounts/AccountType";

import { CreateTwitterSocialPosts } from "../common/SocialPosts/CreateTwitterSocialPosts";
import { CreateRedditSocialPosts } from "../common/SocialPosts/CreateRedditSocialPost";

import SocialPost from "./components/SocialPost";
import ImageSocialPost from "./components/ImageSocialPost";
import VideoSocialPost from "./components/VideoSocialPost";
import ArticleSocialPost from "./components/ArticleSocialPost";

import ContentModel from "./ContentModel";
import React from "react";
import { Text } from "react-native";
import { ThemeConsumer } from "react-native-elements";

const reddit = require("../assets/Reddit.png");
const twitter = require("../assets/Twitter.png");

class Presenter {
  constructor(attachedScreen) {
    this.ContentModel = new ContentModel();
    this.AttachedScreen = attachedScreen;
    this.Initialize = false;
    this.GetAllStoredAccountInfo();
  }

  GetAccounts() {
    return this.ContentModel.GetAccounts();
  }

  async GetAllStoredAccountInfo() {
    var Updated = await this.ContentModel.GetAllStoredAccountInfo();
    if (Updated == true) {
      console.log(Updated);
      this.AttachedScreen.Refresh(true);
    }

    if (!this.Initialize) {
      this.Initialize = false;
      this.AttachedScreen.Refresh(true);
    }
  }

  async GetStoredAccountByID(accountID) {
    return await this.ContentModel.GetStoredAccount(accountID);
  }

  async RemoveAccount(accountID) {
    var res = await this.ContentModel.RemoveStoredAccount(accountID);
    this.AttachedScreen.Refresh();
    return res;
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

  async UpdateAccount(accountID, action, muted) {
    await this.ContentModel.UpdateAccount(accountID, action, muted);
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

    //Sort content
    var sortedContent = Content.sort(
      (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
    );

    return this.CreateSocialPostComponents(sortedContent);
  }

  CreateSocialPostComponents(ListofData) {
    var ComponentContent = [];
    for (var dataIndex in ListofData) {
      if (ListofData[dataIndex].type == "SocialPost") {
        this.CreateComponentSocialPost(ListofData[dataIndex], ComponentContent);
      } else if (ListofData[dataIndex].type == "ArticleSocialPost") {
        this.CreateComponentArticleSocialPost(
          ListofData[dataIndex],
          ComponentContent
        );
      } else if (ListofData[dataIndex].type == "VideoSocialPost") {
        this.CreateComponentVideoSocialPost(
          ListofData[dataIndex],
          ComponentContent
        );
      } else if (ListofData[dataIndex].type == "ImageSocialPost") {
        this.CreateComponentImageSocialPost(
          ListofData[dataIndex],
          ComponentContent
        );
      }
    }

    return ComponentContent;
  }

  CreateComponentArticleSocialPost(post, content) {
    content.push(
      <ArticleSocialPost
        key={post.key}
        name={post.name}
        username={post.username}
        body={post.body}
        imageURL={post.imageURL}
        created_at={post.created_at}
        thumbnail={post.thumbnail}
        article_link={post.article_link}
        post_url={post.post_url}
        post_type={post.post_type}
      />
    );
  }

  CreateComponentVideoSocialPost(post, content) {
    content.push(
      <VideoSocialPost
        key={post.key}
        name={post.name}
        username={post.username}
        body={post.body}
        imageURL={post.imageURL}
        created_at={post.created_at}
        thumbnail={post.thumbnail}
        video_link={post.video_link}
        post_url={post.post_url}
        post_type={post.post_type}
      />
    );
  }

  CreateComponentImageSocialPost(post, content) {
    content.push(
      <ImageSocialPost
        key={post.key}
        name={post.name}
        username={post.username}
        body={post.body}
        imageURL={post.imageURL}
        created_at={post.created_at}
        thumbnail={post.thumbnail}
        post_url={post.post_url}
        post_type={post.post_type}
      />
    );
  }

  CreateComponentSocialPost(post, content) {
    content.push(
      <SocialPost
        key={post.key}
        name={post.name}
        username={post.username}
        body={post.body}
        imageURL={post.imageURL}
        created_at={post.created_at}
        post_url={post.post_url}
        post_type={post.post_type}
      />
    );
  }

  GetAmountOfRedditAcconunts() {
    return this.ContentModel.GetAmountOfRedditAcconunts();
  }
  GetAmountOfTwitterAcconunts() {
    return this.ContentModel.GetAmountOfTwitterAcconunts();
  }

  async ClearAccounts() {
    console.log(this.ContentModel);

    return await this.ContentModel.ClearAccounts();
  }
}

export default Presenter;
