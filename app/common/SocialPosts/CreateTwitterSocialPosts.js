import SocialPost from "../../screens/components/SocialPost";
import React from "react";

export const CreateTwitterSocialPosts = (account, accountData, content) => {
  //   console.log(account);
  //   console.log(accountData);

  for (var twiiterFollowID in accountData) {
    console.log(account.FollowedAccounts[twiiterFollowID]);

    CreateTwitterSocialPost(
      account.FollowedAccounts[twiiterFollowID],
      accountData[twiiterFollowID].data,
      content
    );
  }

  return content;
};

const CreateTwitterSocialPost = (twitterAccount, twitterPosts, content) => {
  for (var post in twitterPosts) {
    content.push(
      <SocialPost
        key={twitterPosts[post].id}
        name={twitterAccount.name}
        username={twitterAccount.screen_name}
        body={twitterPosts[post].text}
        imageURL={twitterAccount.profile_image_url}
      />
    );
  }
};
