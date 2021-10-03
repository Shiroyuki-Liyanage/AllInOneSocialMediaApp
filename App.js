// import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";

// import {
//   useDimensions,
//   useDeviceOrientation,
// } from "@react-native-community/hooks";

import HomeScreen from "./app/screens/HomeScreen";

export default function App() {
  console.log("App executed");

  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
