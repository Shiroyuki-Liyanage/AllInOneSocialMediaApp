import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "react-native-elements";
import SocialPost from "./SocialPost";

class ImageSocialPost extends SocialPost {
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
              <Text style={styles.username}> @{this.props.username}</Text>
            </View>
            <Text style={styles.body}>{this.props.body}</Text>
            <Image
              style={styles.thumbnailImg}
              source={{ uri: this.props.thumbnail }}
            />
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
                styles={{ height: 20, width: 20 }}
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
    height: "100%",
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
  thumbnailImg: {
    height: 200,
    maxHeight: 200,
    width: "100%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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

export default ImageSocialPost;