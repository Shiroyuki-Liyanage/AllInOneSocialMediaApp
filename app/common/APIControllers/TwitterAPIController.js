import APIController from "./APIController";
import * as SecureStore from "expo-secure-store";
import { GetTwitterAuthKey } from "../StoreAuthKey";

class TwitterAPIController extends APIController {
  async GetRequest(account) {
    var requestOptions = await this.SetUpRequest();

    let Profile = await this.GetAdvanceUserInfo(
      requestOptions,
      account.getAccountID()
    );
    //console.log(Profile);

    return await this.GetAccountFollowsTweet(requestOptions, account);
  }

  /**
   * Set up request headers and authentication
   * @returns RequestOptions Headers for the request and Authentication
   */
  async SetUpRequest() {
    var myHeaders = new Headers();

    var AuthToken = await GetTwitterAuthKey();

    myHeaders.append("Authorization", "Bearer " + AuthToken);
    myHeaders.append(
      "Cookie",
      'guest_id=v1%3A163434148016875536; personalization_id="v1_vbrITI2+ZEDvtB+fOYtVbQ=="'
    );

    return {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  }

  /**
   * Get basic User info with ID
   * @param {object} requestOptions, Request parameters for auth
   * @param {string} id, account's Id
   * @returns
   */
  async GetBasicUserInfo(requestOptions, id) {
    try {
      let response = await fetch(
        "https://api.twitter.com/2/users/" + id,
        requestOptions
      ).catch((error) => console.log("error", error));

      return await response.json();
    } catch (error) {
      return null;
    }
  }

  /**
   * Get advance user info with id
   * @param {object} requestOptions, Request parameters for auth
   * @param {string} id, account's Id
   * @returns
   */
  async GetAdvanceUserInfo(requestOptions, id) {
    try {
      let response = await fetch(
        "https://api.twitter.com/1.1/users/show.json?user_id=" + id,
        requestOptions
      ).catch((error) => console.log("error", error));

      return await response.json();
    } catch (error) {
      return null;
    }
  }

  /**
   * Request user's follows
   * @param {string} id , account's Id
   * @returns
   */
  async GetAccountFollows(id) {
    var requestOptions = await this.SetUpRequest();
    try {
      let response = await fetch(
        "https://api.twitter.com/2/users/" +
          id +
          "/following?user.fields=created_at&tweet.fields=created_at",
        requestOptions
      ).catch((error) => console.log("error", error));

      return await response.json();
    } catch (error) {
      return null;
    }
  }

  async GetAccountFollowsTweet(requestOptions, account) {
    var Content = {};
    for (var followID in account.GetAccountFollows()) {
      Content[followID] = await this.GetTweets(requestOptions, followID);
    }
    return Content;
  }

  /**
   * Retrieve recent tweets from an account
   * @param {object} requestOptions
   * @param {string} id
   * @returns
   */
  async GetTweets(requestOptions, id) {
    //Maximum amount of tweets that can be retrieved from account
    const Max_Tweet_Results = 5;

    try {
      let response = await fetch(
        "https://api.twitter.com/2/users/" +
          id +
          "/tweets?max_results=" +
          Max_Tweet_Results,
        requestOptions
      ).catch((error) => console.log("error", error));

      return await response.json();
    } catch (error) {
      return null;
    }
  }
}

export default TwitterAPIController;
