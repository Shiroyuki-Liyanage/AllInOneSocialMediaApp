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

function HomeScreen(props) {
  var PostManager = new SocialPostManager();
  PostManager.GetAccounts().addAccount(
    new TwitterAccount("2401655624", AccountType.TWITTER)
  );

  PostManager.requestContent();

  //GetProfileImage().then((Profile) => console.log(Profile));

  return (
    <ScrollView>
      <SocialPost
        firstName={"Gus"}
        lastName={"Buckets"}
        username={"GusBuckets"}
        body={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed quam aarcu ornare mattis nec ac tortor. "
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default HomeScreen;
