// import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";

import HomeScreen from "./app/screens/HomeScreen";
import TwitterLoginPage from "./app/screens/TwitterLoginPage";
import RedditLoginPage from "./app/screens/RedditLoginPage";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

class App extends React.Component {
  render() {
    console.log("App has been executed");
    //StoreAuthKey();
    return (
      <NavigationContainer theme={DefaultTheme}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen
            name="Twitter Login Page"
            component={TwitterLoginPage}
          />
          <Drawer.Screen name="Reddit Login Page" component={RedditLoginPage} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

// export default function App() {
//   console.log("App has been executed");
//   //StoreAuthKey();
//   return (
//     <NavigationContainer theme={DefaultTheme}>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Twitter Login Page" component={TwitterLoginPage} />
//         <Drawer.Screen name="Reddit Login Page" component={RedditLoginPage} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 255, 255)",
    background: "rgb(255, 255, 255)",
    card: "rgb(0, 0, 0)",
    text: "rgb(255, 255, 255)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};
