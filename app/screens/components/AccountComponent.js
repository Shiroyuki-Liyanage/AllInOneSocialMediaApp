import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Pressable,
  Linking,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";

const reddit = require("../../assets/Reddit.png");
const twitter = require("../../assets/Twitter.png");

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  RemoveAccount,
  UpdateAccount,
} from "../../reduxScripts/Actions/AccountActions";
import { SET_MUTE } from "../../reduxScripts/Actions/PresenterActions";

class AccountComponent extends React.Component {
  async RemoveAccount(accountID, presenter) {
    this.props.removeAccount(accountID);
    if (
      this.props.accounts.twitterAccounts.length <= 0 &&
      this.props.accounts.redditAccounts <= 0
    ) {
      await presenter.ClearAccounts();
    } else {
      await presenter.RemoveAccount(accountID);
    }
  }

  async MuteAccount(accountID, presenter, isMuted) {
    var NewMuted = !isMuted;
    let Message = "";
    if (NewMuted) {
      Message = "Account has been muted";
    } else {
      Message = "Account has been unmuted";
    }

    Alert.alert("Account Info", Message);
    await presenter.UpdateAccount(accountID, SET_MUTE, NewMuted);
    this.props.updateAccount(accountID, SET_MUTE, NewMuted);
  }

  GetLogo(logoName) {
    if (logoName == "twitter") {
      return twitter;
    } else if (logoName == "reddit") {
      return reddit;
    }
  }
  render() {
    return (
      <View style={styles.FullPost}>
        <View
          style={{
            flexDirection: "row",
            minheight: 10,
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Image
            style={styles.logoImg}
            source={this.GetLogo(this.props.post_type)}
          />
        </View>
        <View style={styles.topPost}>
          <View
            style={{
              flex: 0.2,
              alignItems: "center",
              paddingTop: 4,
            }}
          >
            <Image
              style={styles.profileImg}
              source={{ uri: this.props.profile_image_url }}
            />
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              flex: 0.8,
              justifyContent: "center",
              paddingleft: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              <Text style={styles.displayName}>{this.props.name}</Text>
            </View>
            <Text style={styles.username}> {this.props.username}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <TouchableWithoutFeedback id="Settings" style={styles.postButton}>
              <Icon name="tune" type="material-community" color="white" />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <TouchableWithoutFeedback
              id="MuteAccount"
              style={styles.postButton}
              onPress={() => {
                console.log("Mute");
                this.MuteAccount(
                  this.props.accountID,
                  this.props.presenter,
                  this.props.isMuted
                );
              }}
            >
              <Icon name="bell" type="material-community" color="white" />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <TouchableWithoutFeedback
              id="RemoveAccount"
              style={styles.postButton}
              onPress={() => {
                this.RemoveAccount(this.props.accountID, this.props.presenter);
              }}
            >
              <Icon
                name="delete-forever"
                type="material-community"
                color="white"
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FullPost: {
    backgroundColor: "black",
    width: "100%",
    minHeight: 100,
    flex: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "#343434",
    borderTopColor: "#343434",
    padding: 10,
  },
  topPost: {
    flexDirection: "row",
    alignContent: "center",
    paddingBottom: 10,
  },
  displayName: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 20,
    flexWrap: "wrap",
    height: "100%",
    fontSize: 25,
  },
  username: {
    color: "#696969",
    flexWrap: "wrap",
    width: "100%",
    paddingLeft: 20,
    fontSize: 15,
  },
  date: {
    color: "#696969",
    flexWrap: "wrap",
    height: "100%",
    textAlign: "right",
    padding: 5,
  },
  body: {
    color: "white",
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    flexWrap: "wrap",
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  logoImg: {
    height: 30,
    width: 30,

    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  bottomPost: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100",
  },
  postButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "black",
    color: "white",
    width: "100%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

const mapStateToProps = (state) => {
  const { accounts } = state;
  return { accounts };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeAccount: RemoveAccount,
      updateAccount: UpdateAccount,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountComponent);
