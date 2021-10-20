import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
} from "react-native";

import Presenter from "./Presenter";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";

const Tab = createBottomTabNavigator();

class HomeScreen extends React.Component {
  state = {
    socialPost: {},
    refreshing: false,
  };

  constructor() {
    super();
    this.Presenter = new Presenter(this);
  }

  componentDidMount() {}

  /**
   * Get recent social media posts from all linked accounts
   */
  async GetSocialPosts() {
    this.setState({ refreshing: true });
    var Content = await this.Presenter.RefreshSocialMediaPosts();
    this.setState({ socialPost: Content, refreshing: false });
    return true;
  }

  CreateSocialPosts(socialPosts) {
    var content = this.Presenter.CreateSocialPosts(socialPosts);

    return content.length > 0
      ? content
      : [<Text key={"NoPosts"}>No posts... :(</Text>];
  }

  async UpdateTwitterAccounts(accounts) {
    //console.log(accounts);
    if (accounts.length > 0) {
      let isNewAccount = await this.Presenter.AddTwitterAccount(accounts);
      if (isNewAccount) {
        this.GetSocialPosts();
      }
    }
  }

  async UpdateRedditAccounts(accounts) {
    //console.log(accounts);
    if (accounts.length > 0) {
      let isNewAccount = await this.Presenter.AddRedditAccount(accounts);
      if (isNewAccount) {
        this.GetSocialPosts();
      }
    }
  }

  render() {
    let { socialPost, refreshing } = this.state;
    // if (isUpdate) {
    this.UpdateTwitterAccounts(this.props.accounts.twitterAccounts);
    this.UpdateRedditAccounts(this.props.accounts.redditAccounts);
    // }

    return (
      <View style={styles.container}>
        {/* <Text style={{ color: "white" }}>
          You have {this.props.accounts.account[0]} friends.
        </Text> */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                this.GetSocialPosts();
              }}
            />
          }
        >
          {this.CreateSocialPosts(socialPost)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

const mapStateToProps = (state) => {
  const { accounts } = state;
  return { accounts };
};

export default connect(mapStateToProps)(HomeScreen);
