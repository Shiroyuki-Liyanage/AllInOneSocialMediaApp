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

class HomeScreen extends React.Component {
  state = {
    socialPost: {},
  };

  constructor() {
    super();
    this.PostManager = new SocialPostManager();
  }

  componentDidMount() {
    this.PostManager.GetAccounts().addAccount(
      new TwitterAccount("2401655624", AccountType.TWITTER)
    );

    this.GetSocialPost();
  }

  async GetSocialPost() {
    var Content = await this.PostManager.requestContent();
    console.log(Content);
    this.setState({ socialPost: Content });
  }

  CreateSocialPosts(socialPost) {
    //var Content = await PostManager.requestContent();
    console.log(socialPost);

    return (
      <SocialPost
        firstName={"Gus"}
        lastName={"Buckets"}
        username={"GusBuckets"}
        body={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed quam aarcu ornare mattis nec ac tortor. "
        }
      />
    );
  }

  render() {
    let { socialPost } = this.state;
    return <ScrollView>{this.CreateSocialPosts(socialPost)}</ScrollView>;
  }
}

const styles = StyleSheet.create({});

export default HomeScreen;
