import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

import Presenter from "./Presenter";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

  async componentDidMount() {
    // this.PostManager.GetAccountManager().AddAccount(
    //   await new TwitterAccount(
    //     "2401655624",
    //     AccountType.TWITTER
    //   ).InitializeAccount()
    // );
    //this.GetSocialPosts();
  }

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
    return this.Presenter.CreateSocialPosts(socialPosts);
  }

  render() {
    let { socialPost, refreshing } = this.state;
    return (
      <View style={styles.container}>
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

//
//   <HomeScreen />
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default HomeScreen;
