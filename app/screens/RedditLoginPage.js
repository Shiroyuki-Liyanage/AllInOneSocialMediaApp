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
import {
  AddRedditAccount,
  AddTwitterAccount,
} from "../reduxScripts/Actions/AccountActions";
const reddit = require("../assets/Reddit.png");
import TwitterAPIController from "../common/APIControllers/TwitterAPIController";

class RedditLoginPage extends React.Component {
  state = {
    redditCommunity: "newzealand",
  };

  constructor() {
    super();
    this.TwitterAPI = new TwitterAPIController();
  }

  async CheckValidRedditCommunity() {
    this.props.addRedditAccount(this.state.redditCommunity);

    Keyboard.dismiss();

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
          <Image source={reddit} style={styles.image} />
        </View>

        <Text style={styles.Text}>Link Reddit Community</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Reddit Community"
          value={this.state.redditCommunity}
          onChangeText={(redditCommunity) => this.setState({ redditCommunity })}
        />

        <Button
          title="Link Account"
          onPress={() => {
            this.CheckValidRedditCommunity();
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
      addRedditAccount: AddRedditAccount,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RedditLoginPage);
