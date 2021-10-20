import APIController from "./APIController";
import * as SecureStore from "expo-secure-store";
import { GetTwitterAuthKey } from "../StoreAuthKey";

class RedditAPIController extends APIController {
  async GetRequest(account) {
    return await this.GetCommunityContent(account);
  }

  async GetCommunityInfoData(communityName) {
    try {
      let response = await fetch(
        "https://www.reddit.com/r/" + communityName + "/about.json"
      ).catch((error) => console.log("error", error));
      return await response.json();
    } catch (error) {
      return null;
    }
  }

  async GetCommunityContent(community) {
    try {
      let response = await fetch(
        "https://www.reddit.com/r/" + community.getAccountID() + ".json"
      ).catch((error) => console.log("error", error));
      return await response.json();
    } catch (error) {
      return null;
    }
  }

  /**
   * Set up request headers and authentication
   * @returns RequestOptions Headers for the request and Authentication
   */
  async SetUpRequest() {}
}

export default RedditAPIController;
