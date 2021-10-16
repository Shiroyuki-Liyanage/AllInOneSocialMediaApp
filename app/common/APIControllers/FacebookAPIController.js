import APIController from "./APIController";
import * as SecureStore from "expo-secure-store";
import { GetTwitterAuthKey } from "../StoreAuthKey";

class FacebookAPIController extends APIController {
  async GetRequest() {}

  /**
   * Set up request headers and authentication
   * @returns RequestOptions Headers for the request and Authentication
   */
  async SetUpRequest() {}
}

export default FacebookAPIController;
