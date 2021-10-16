// import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { StoreAuthKey } from "./app/common/StoreAuthKey";

// import {
//   useDimensions,
//   useDeviceOrientation,
// } from "@react-native-community/hooks";

import HomeScreen from "./app/screens/HomeScreen";

export default function App() {
  console.log("App has been executed");
  //StoreAuthKey();
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
