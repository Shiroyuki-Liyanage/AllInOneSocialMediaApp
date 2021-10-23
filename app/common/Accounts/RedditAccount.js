import RedditAPIController from "../APIControllers/RedditAPIController";
import Account from "./Account";
import { AccountType } from "./AccountType";

class RedditAccount extends Account {
  constructor(accountID, accountType) {
    super(accountID, accountType);
    this.RedditCommunityData = {};
  }

  async InitializeAccount(storedRedditCommunityData) {
    if (typeof storedRedditCommunityData == "undefined") {
      await this.GetCommunityData();
    } else {
      this.RedditCommunityData = storedRedditCommunityData;
    }

    return this;
  }

  async GetCommunityData() {
    var RedditAPI = new RedditAPIController();
    var subRedditData = await RedditAPI.GetCommunityInfoData(this.accountID);

    //console.log(subRedditData);

    this.RedditCommunityData["id"] = subRedditData.data.id;
    //this.RedditCommunityData["description"] = subRedditData.data.description;
    this.RedditCommunityData["url"] = subRedditData.data.url;

    if (subRedditData.data.icon_img != "") {
      this.RedditCommunityData["imageURL"] = subRedditData.data.icon_img;
    } else if (subRedditData.data.header_img != "") {
      this.RedditCommunityData["imageURL"] = subRedditData.data.header_img;
    } else {
      this.RedditCommunityData["imageURL"] =
        "https://static.thenounproject.com/png/340719-200.png";
    }

    this.RedditCommunityData["title"] = subRedditData.data.title;
    this.RedditCommunityData["display_name"] = subRedditData.data.display_name;
  }
}

export default RedditAccount;
