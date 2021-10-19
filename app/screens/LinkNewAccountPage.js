import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  Text,
} from "react-native";
class LinkNewAccountPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>Choose which type of Account to link...</Text>

        <Button
          title="Link new twitter account"
          onPress={() => this.props.navigate.navigate("Twitter Login Page")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
  },
  Text: {
    color: "white",
    paddingTop: 50,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default LinkNewAccountPage;
