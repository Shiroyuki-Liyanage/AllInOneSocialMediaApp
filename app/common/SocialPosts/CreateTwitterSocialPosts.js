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
    //unsortedContent = unsortedContent.concat(accountData[twiiterFollowID].data);
  }
  console.log("unsorted");
  console.log(unsortedContent);

  //Sort content
  var sortedContent = unsortedContent.sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
  );
  console.log("sorted");
  console.log(sortedContent);

  for (var twitterPostIndex in sortedContent) {
    //console.log(account.FollowedAccounts);
    CreateTwitterSocialPost(
      account.FollowedAccounts[sortedContent[twitterPostIndex].parent_account],
      sortedContent[twitterPostIndex],
      content
    );
  }

  // CreateTwitterSocialPost(
  //   account.FollowedAccounts[twiiterFollowID],
  //   accountData[twiiterFollowID].data,
  //   content
  // );

  return content;
};

const CreateTwitterSocialPost = (twitterAccount, twitterPost, content) => {
  // console.log(twitterAccount);
  // console.log(twitterPost);
  content.push(
    <SocialPost
      key={twitterPost.id}
      name={twitterAccount.name}
      username={twitterAccount.screen_name}
      body={twitterPost.text}
      imageURL={twitterAccount.profile_image_url}
      created_at={twitterPost.created_at}
    />
  );
};
