import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import SocialPost from "./components/SocialPost";

import SocialPostManager from "../common/SocialPostManager";
import TwitterAccount from "../common/Accounts/TwitterAccount";
import { AccountType } from "../common/Accounts/AccountType";

import { CreateTwitterSocialPosts } from "../common/SocialPosts/CreateTwitterSocialPosts";

class HomeScreen extends React.Component {
  state = {
    socialPost: {},
  };

  constructor() {
    super();
    this.PostManager = new SocialPostManager();
  }

  async componentDidMount() {
    this.PostManager.GetAccountManager().AddAccount(
      await new TwitterAccount(
        "2401655624",
        AccountType.TWITTER
      ).InitializeAccount()
    );

    this.GetSocialPosts();
  }

  /**
   * Get recent social media posts from all linked accounts
   */
  async GetSocialPosts() {
    var Content = await this.PostManager.requestContent();
    this.setState({ socialPost: Content });
  }

  CreateSocialPosts(socialPosts) {
    //If no content then don't display anything
    if (Object.keys(socialPosts).length <= 0) {
      return;
    }

    //var Content = await PostManager.requestContent();
    //console.log(socialPosts);
    var Content = [];
    for (var AccountID in socialPosts) {
      switch (this.PostManager.GetAccountManager().GetAccountType(AccountID)) {
        case AccountType.TWITTER:
          Content = CreateTwitterSocialPosts(
            this.PostManager.GetAccountManager().GetAccount(AccountID),
            socialPosts[AccountID],
            Content
          );

          break;
        case AccountType.REDDIT:
          break;
        case AccountType.FACEBOOK:
          break;
      }
    }

    console.log(Content);

    return Content;
  }

  render() {
    let { socialPost } = this.state;
    return <ScrollView>{this.CreateSocialPosts(socialPost)}</ScrollView>;
  }
}

const styles = StyleSheet.create({});

export default HomeScreen;
