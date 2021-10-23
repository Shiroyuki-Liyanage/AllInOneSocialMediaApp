import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Button,
} from "react-native";

import Presenter from "./Presenter";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UpdateAccounts } from "../reduxScripts/Actions/AccountActions";
import AccountComponent from "./components/AccountComponent";

class AccountsPage extends React.Component {
  constructor() {
    super();
    this.Presenter = new Presenter(this);
  }

  state = {
    accounts: [],
    refreshing: false,
  };

  Refresh(Update) {
    if (typeof Update != "undefined") {
      this.props.updateAccounts(this.Presenter.GetAccounts());
    }

    this.GetAccounts();
  }

  async GetAccounts() {
    let twitterAccounts = this.props.accounts.twitterAccounts;
    let redditAccounts = this.props.accounts.redditAccounts;

    let originalAccounts = this.state.accounts;

    let accounts = [];

    for (var index in twitterAccounts) {
      let jsonTwitter = await this.Presenter.GetStoredAccountByID(
        twitterAccounts[index]
      );
      accounts.push(jsonTwitter);
    }
    for (var index in redditAccounts) {
      let jsonReddit = await this.Presenter.GetStoredAccountByID(
        redditAccounts[index]
      );
      accounts.push(jsonReddit);
    }

    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    if (!isEqual(originalAccounts, accounts)) {
      this.setState({
        accounts: accounts,
      });
    }
  }

  CreateAccountCommponents(accounts) {
    var Content = [];
    try {
      for (var index in accounts) {
        if (accounts[index].accountType == "Twitter") {
          Content.push(this.CreateTwitterAccountComponent(accounts[index]));
        } else if (accounts[index].accountType == "Reddit") {
          Content.push(this.CreateRedditAccountComponent(accounts[index]));
        }
      }
    } catch (error) {
      return Content;
    }

    return Content;
  }

  CreateTwitterAccountComponent(account) {
    //console.log(account);
    return (
      <AccountComponent
        key={account.accountID}
        name={account.UserData.name}
        username={account.UserData.screen_name}
        profile_image_url={account.UserData.profile_image_url_https}
        presenter={this.Presenter}
        accountID={account.accountID}
      />
    );
  }

  CreateRedditAccountComponent(account) {
    //console.log(account);
    return (
      <AccountComponent
        key={account.accountID}
        name={account.RedditCommunityData.display_name}
        username={account.RedditCommunityData.url}
        profile_image_url={account.RedditCommunityData.imageURL}
        presenter={this.Presenter}
        accountID={account.accountID}
        isMuted={account.muted}
      />
    );
  }

  render() {
    let { accounts, refreshing } = this.state;
    this.GetAccounts();
    return (
      <View style={styles.container}>
        <Button
          title={"Refresh Accounts"}
          onPress={() => {
            this.GetAccounts();
          }}
        />
        <Button
          title={"Clear Accounts"}
          onPress={() => {
            this.Presenter.ClearAccounts();
          }}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                this.GetAccounts();
                this.setState({ refreshing: false });
              }}
            />
          }
        >
          {this.CreateAccountCommponents(accounts)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

const mapStateToProps = (state) => {
  const { accounts } = state;
  return { accounts };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateAccounts: UpdateAccounts,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
