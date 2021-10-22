import SocialPost from "./components/SocialPost";

import SocialPostManager from "../common/SocialPostManager";
import TwitterAccount from "../common/Accounts/TwitterAccount";
import RedditAccount from "../common/Accounts/RedditAccount";
import { AccountType } from "../common/Accounts/AccountType";

import AsyncStorage from "@react-native-async-storage/async-storage";

class ContentModel {
  constructor() {
    this.Content = [];
    this.PostManager = new SocialPostManager();
  }

  async AddTwitterAccount(accounts) {
    for (var index in accounts) {
      if (
        !this.PostManager.GetAccountManager().CheckAccountExist(accounts[index])
      ) {
        //console.log(accounts[index]);
        var NewAccount = await new TwitterAccount(
          accounts[index],
          AccountType.TWITTER
        ).InitializeAccount();
        await this.PostManager.GetAccountManager().AddAccount(NewAccount);
        this.StoreAccountInfo(NewAccount);
        return true;
      }
    }

    return false;
  }

  async AddRedditAccount(accounts) {
    for (var index in accounts) {
      if (
        !this.PostManager.GetAccountManager().CheckAccountExist(accounts[index])
      ) {
        //console.log(accounts[index]);

        var NewAccount = await new RedditAccount(
          accounts[index],
          AccountType.REDDIT
        ).InitializeAccount();

        await this.PostManager.GetAccountManager().AddAccount(NewAccount);
        this.StoreAccountInfo(NewAccount);
        return true;
      }
    }

    return false;
  }

  async StoreAccountInfo(account) {
    try {
      var Accounts = await this.GetStoredAccounts();
      Accounts.push(account.accountID);
      await AsyncStorage.setItem("Accounts", JSON.stringify(Accounts));
      await AsyncStorage.setItem(account.accountID, JSON.stringify(account));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get all the stored accounts on phone
   */
  async GetAllStoredAccountInfo() {
    var Accounts = await this.GetStoredAccounts();
    for (var index in Accounts) {
      var storedAccount = await this.GetStoredAccount(Accounts[index]);
      if (storedAccount["accountType"] == "Twitter") {
        await this.PostManager.GetAccountManager().AddAccount(
          await this.CreateTwitterAccount(storedAccount)
        );
      } else if (storedAccount["accountType"] == "Reddit") {
        await this.PostManager.GetAccountManager().AddAccount(
          await this.CreateRedditAccount(storedAccount)
        );
      }
    }

    //console.log(this.PostManager.GetAccountManager());
  }

  async ClearAccounts() {
    await AsyncStorage.setItem("Accounts", JSON.stringify([]));
  }

  async CreateTwitterAccount(jsonAccount) {
    return await new TwitterAccount(
      jsonAccount["accountID"],
      AccountType.TWITTER
    ).InitializeAccount(jsonAccount["FollowedAccounts"]);
  }

  async CreateRedditAccount(jsonAccount) {
    return await new RedditAccount(
      jsonAccount["accountID"],
      AccountType.REDDIT
    ).InitializeAccount(jsonAccount["RedditCommunityData"]);
  }

  /**
   * Get stored account on phone
   */
  async GetStoredAccount(accountID) {
    try {
      var res = await AsyncStorage.getItem(accountID);
      if (res != null) {
        return JSON.parse(res);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async GetStoredAccounts() {
    try {
      var res = await AsyncStorage.getItem("Accounts");
      if (res == null) {
        res = [];
      } else {
        res = JSON.parse(res);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get recent social media posts
   * @returns
   */
  async GetSocialMediaPosts() {
    this.Content = await this.PostManager.requestContent();
    return this.Content;
  }

  GetPostManager() {
    return this.PostManager;
  }

  GetAccounts() {
    return this.PostManager.GetAccounts();
  }
}

export default ContentModel;
