import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Pressable,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "react-native-elements";
import SocialPost from "./SocialPost";

const reddit = require("../../assets/Reddit.png");
const twitter = require("../../assets/Twitter.png");

class VideoSocialPost extends SocialPost {
  render() {
    return (
      <View style={styles.FullPost}>
        <View
          style={{
            flexDirection: "row",
            minheight: 10,
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ textAlign: "right", padding: 5, color: "grey" }}>
            {this.props.created_at}
          </Text>
          <Image
            style={styles.logoImg}
            source={this.GetLogo(this.props.post_type)}
          />
        </View>
        <View style={styles.topPost}>
          <View
            style={{
              flex: 0.2,
              alignItems: "center",
              paddingTop: 4,
            }}
          >
            <Image
              style={styles.profileImg}
              source={{ uri: this.props.imageURL }}
            />
          </View>
          <View style={{ backgroundColor: "transparent", flex: 0.8 }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={styles.displayName}>{this.props.name}</Text>
            </View>
            <Text style={styles.username}> {this.props.username}</Text>
            <Text style={styles.body}>{this.props.body}</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                this.GoToPostLink(this.props.video_link);
              }}
            >
              <View style={styles.thumbnail}>
                <Image
                  style={styles.thumbnailImg}
                  source={{ uri: this.props.thumbnail }}
                />
                <Text style={styles.thumbnailText}>
                  {"Video Link: " + this.props.video_link}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <View style={{ backgroundColor: "transparent", flex: 0.5 }}>
            <TouchableWithoutFeedback
              id="Link"
              style={styles.postButton}
              onPress={() => {
                this.GoToPostLink(this.props.post_url);
              }}
            >
              <Icon
                name="link-variant"
                type="material-community"
                color="white"
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ backgroundColor: "transparent", flex: 0.5 }}>
            <TouchableWithoutFeedback id="Comment" style={styles.postButton}>
              <Icon name="comment" type="material-community" color="white" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FullPost: {
    backgroundColor: "black",
    width: "100%",
    minHeight: 100,
    flex: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "#343434",
    borderTopColor: "#343434",
    padding: 10,
  },
  topPost: {
    flexDirection: "row",
    alignContent: "center",
    paddingBottom: 10,
  },
  displayName: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10,
    flexWrap: "wrap",
    height: "100%",
  },
  username: {
    color: "#696969",
    flexWrap: "wrap",
    width: "100%",
  },
  date: {
    color: "#696969",
    flexWrap: "wrap",
    height: "100%",
    textAlign: "right",
    padding: 5,
  },
  body: {
    color: "white",
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    flexWrap: "wrap",
  },
  profileImg: {
    height: 45,
    width: 45,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  logoImg: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  thumbnail: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    backgroundColor: "#003850",
    borderRadius: 5,
  },
  thumbnailImg: {
    height: 100,
    flex: 0.3,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  thumbnailText: {
    flex: 0.7,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    color: "white",
  },
  bottomPost: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100",
  },
  postButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "black",
    color: "white",
    width: "100%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default VideoSocialPost;
