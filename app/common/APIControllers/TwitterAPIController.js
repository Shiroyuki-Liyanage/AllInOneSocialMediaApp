import APIController from "./APIController";
import * as SecureStore from "expo-secure-store";
import { GetTwitterAuthKey } from "../StoreAuthKey";

class TwitterAPIController extends APIController {
  async GetRequest(account) {
    console.log(":)");
    var requestOptions = await this.SetUpRequest();

    let Profile = await this.GetAdvanceUserInfo(
      requestOptions,
      account.getAccountID()
    );
    console.log(Profile);
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
   * @param {*} requestOptions, Request parameters for auth
   * @param {*} id, user's Id
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
   * @param {*} requestOptions
   * @param {*} id
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
}

export default TwitterAPIController;
