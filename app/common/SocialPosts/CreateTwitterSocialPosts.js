import SocialPost from "../../screens/components/SocialPost";
import React from "react";

export const CreateTwitterSocialPosts = (account, accountData, content) => {
  //   console.log(account);
  //   console.log(accountData);

  var unsortedContent = [];

  for (var twiiterFollowID in accountData) {
    //console.log(account.FollowedAccounts[twiiterFollowID]);
    for (var postIndex in accountData[twiiterFollowID].data) {
      accountData[twiiterFollowID].data[postIndex]["parent_account"] =
        twiiterFollowID;
      unsortedContent.push(accountData[twiiterFollowID].data[postIndex]);
    }
  }

  //Sort content
  var sortedContent = unsortedContent.sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
  );

  for (var twitterPostIndex in sortedContent) {
    //console.log(account.FollowedAccounts);
    CreateTwitterSocialPost(
      account.FollowedAccounts[sortedContent[twitterPostIndex].parent_account],
      sortedContent[twitterPostIndex],
      content
    );
  }

  return content;
};

export const CreateTwitterSocialPost = (
  twitterAccount,
  twitterPost,
  content
) => {
  content.push({
    type: "SocialPost",
    post_type: "twitter",
    key: twitterPost.id,
    name: twitterAccount.name,
    username: "@" + twitterAccount.screen_name,
    body: twitterPost.text,
    imageURL: twitterAccount.profile_image_url,
    created_at: ConvertUTCToDate(twitterPost.created_at),
    post_url: GetTwitterURL(twitterAccount.screen_name, twitterPost.id),
  });
};

const GetTwitterURL = (accountName, tweetID) => {
  return "https://twitter.com/" + accountName + "/status/" + tweetID;
};

const ConvertUTCToDate = (date) => {
  var myDate = new Date(date);
  return myDate.toLocaleString(); // 01/10/2020, 10:35:02
};
