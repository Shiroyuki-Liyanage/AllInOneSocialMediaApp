import SocialPost from "../../screens/components/SocialPost";
import ImageSocialPost from "../../screens/components/ImageSocialPost";
import VideoSocialPost from "../../screens/components/VideoSocialPost";
import ArticleSocialPost from "../../screens/components/ArticleSocialPost";
import React from "react";

export const CreateRedditSocialPosts = (account, accountData, content) => {
  if (accountData.data == null) {
    return;
  }
  for (var postIndex in accountData.data.children) {
    //console.log(accountData.data.children[postIndex].data);
    if (accountData.data.children[postIndex].data["thumbnail"] == "self") {
      //Reddit post with only text
      CreateRedditSocialPost(
        account,
        accountData.data.children[postIndex].data,
        content
      );
    } else if (accountData.data.children[postIndex].data["media"] != null) {
      //Reddit post with video element
      CreateRedditVideoSocialPost(
        account,
        accountData.data.children[postIndex].data,
        content
      );
    } else if (
      CheckValidImageURL(
        accountData.data.children[postIndex].data.url_overridden_by_dest
      )
    ) {
      //Reddit post with image element
      CreateRedditImageSocialPost(
        account,
        accountData.data.children[postIndex].data,
        content
      );
    } else {
      //Reddit post with article links
      CreateRedditArticleSocialPost(
        account,
        accountData.data.children[postIndex].data,
        content
      );
    }
  }
};

const CreateRedditArticleSocialPost = (accountInfo, post, content) => {
  content.push({
    type: "ArticleSocialPost",
    post_type: "reddit",
    key: post.id,
    name: post.title,
    username: "u/" + post.author,
    body: PostCharacterLimit(post.selftext),
    imageURL: accountInfo.RedditCommunityData.imageURL,
    created_at: ConvertUTCToDate(post.created_utc),
    thumbnail: post.thumbnail,
    article_link: post.url_overridden_by_dest,
    post_url: post.url,
  });
};

const CreateRedditVideoSocialPost = (accountInfo, post, content) => {
  content.push({
    type: "VideoSocialPost",
    post_type: "reddit",
    key: post.id,
    name: post.title,
    username: "u/" + post.author,
    body: PostCharacterLimit(post.selftext),
    imageURL: accountInfo.RedditCommunityData.imageURL,
    created_at: ConvertUTCToDate(post.created_utc),
    thumbnail: post.thumbnail,
    video_link: post.url_overridden_by_dest,
    post_url: post.url,
  });
};

const CreateRedditImageSocialPost = (accountInfo, post, content) => {
  content.push({
    type: "ImageSocialPost",
    post_type: "reddit",
    key: post.id,
    name: post.title,
    username: "u/" + post.author,
    body: PostCharacterLimit(post.selftext),
    imageURL: accountInfo.RedditCommunityData.imageURL,
    created_at: ConvertUTCToDate(post.created_utc),
    thumbnail: post.url_overridden_by_dest,
    post_url: post.url,
  });
};

const CreateRedditSocialPost = (accountInfo, post, content) => {
  content.push({
    type: "SocialPost",
    post_type: "reddit",
    key: post.id,
    name: post.title,
    username: "u/" + post.author,
    body: PostCharacterLimit(post.selftext),
    imageURL: accountInfo.RedditCommunityData.imageURL,
    created_at: ConvertUTCToDate(post.created_utc),
    post_url: post.url,
  });
};

const ConvertUTCToDate = (date) => {
  var myDate = new Date(date * 1000);
  return myDate.toLocaleString(); // 01/10/2020, 10:35:02
};

const PostCharacterLimit = (text) => {
  var limitText = text;
  if (text.length > 280) {
    limitText = text.substring(0, 280) + "...";
  }
  return limitText;
};

const CheckValidImageURL = (url) => {
  if (typeof url == "undefined") {
    return false;
  } else {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
};

//Check if post links to an article!!!
