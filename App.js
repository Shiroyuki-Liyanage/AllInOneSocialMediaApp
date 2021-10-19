// import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";

import HomeScreen from "./app/screens/HomeScreen";
import TwitterLoginPage from "./app/screens/TwitterLoginPage";
import RedditLoginPage from "./app/screens/RedditLoginPage";
import LinkNewAccountPage from "./app/screens/LinkNewAccountPage";
import AccountsPage from "./app/screens/AccountsPage";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";
import { createStore } from "redux";

import AccountReducer from "./app/reduxScripts/Reducers/AccountReducer";
import AccountManager from "./app/common/Accounts/AccountManager";

const Drawer = createDrawerNavigator();

const store = createStore(AccountReducer);

class App extends React.Component {
  render() {
    console.log("App has been executed");

    return (
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Linked Accounts" component={AccountsPage} />

            <Drawer.Screen
              name="Twitter Login Page"
              component={TwitterLoginPage}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }

  // temp() {
  //   const filteredProps = {
  //     ...props,
  //     state: {
  //       ...this.props.state,
  //       routeNames: this.props.state.routeNames.filter((routeName) => {
  //         routeName !== "HiddenPage1" && routeName !== "HiddenPage2";
  //       }),
  //       routes: this.props.state.routes.filter((route) => {
  //         route.name !== "HiddenPage1" && route.name !== "HiddenPage2";
  //       }),
  //     },
  //   };
  // }
}

export default App;

const MyTheme = {
  dark: true,
  colors: {
    primary: "rgb(255, 255, 255)",
    background: "rgb(255, 255, 255)",
    card: "rgb(0, 38, 50)",
    text: "rgb(255, 255, 255)",
    border: "rgb(255, 255, 255)",
    notification: "rgb(255, 255, 255)",
  },
};
