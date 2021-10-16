import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import SocialPost from "./components/SocialPost";

import { GetMe, GetProfileImage } from "../common/GetTweets";
import TwitterAPIController from "../common/APIControllers/TwitterAPIController";

function HomeScreen(props) {
  var TwitterAPI = new TwitterAPIController();
  TwitterAPI.GetRequest();

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
