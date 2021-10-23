import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Alert,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddTwitterAccount } from "../reduxScripts/Actions/AccountActions";
const twitter = require("../assets/Twitter.png");
import TwitterAPIController from "../common/APIControllers/TwitterAPIController";

class TwitterLoginPage extends React.Component {
  state = {
    username: "Yuki_Liyanage",
  };

  constructor() {
    super();
    this.TwitterAPI = new TwitterAPIController();
  }

  async CheckValidTwitterAccount() {
    var user = await this.TwitterAPI.GetUserByUsername(
      null,
      this.state.username
    );

    //If user cannot be found
    if ("errors" in user) {
      Alert.alert("Error! :(", "User " + this.state.username + " Not Found!");
      return;
    }

    Keyboard.dismiss();
    this.props.addTwitterAccount(user.data.id);

    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Image source={twitter} style={styles.image} />
        </View>

        <Text style={styles.Text}>Link Twitter Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Account Username"
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        />

        <Button
          title="Link Account"
          onPress={() => {
            this.CheckValidTwitterAccount();
          }}
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
  image: {
    width: 90,
    height: 90,
    justifyContent: "flex-end",
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

const mapStateToProps = (state) => {
  const { accounts } = state;
  return { accounts };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTwitterAccount: AddTwitterAccount,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TwitterLoginPage);
