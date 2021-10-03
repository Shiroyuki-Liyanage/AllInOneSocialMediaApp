import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import SocialPost from "./components/SocialPost";

function HomeScreen(props) {
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
