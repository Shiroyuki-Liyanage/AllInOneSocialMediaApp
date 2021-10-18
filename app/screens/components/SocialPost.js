import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button, Pressable } from "react-native";
import { Icon } from "react-native-elements";

class SocialPost extends Component {
  render() {
    return (
      <View style={styles.FullPost}>
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
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: "10%",
            width: "100%",
          }}
        >
          <View style={{ backgroundColor: "transparent", flex: 0.5 }}>
            <Pressable id="Link" style={styles.postButton}>
              <Icon
                name="link-variant"
                type="material-community"
                color="white"
              />
            </Pressable>
          </View>
          <View style={{ backgroundColor: "transparent", flex: 0.5 }}>
            <Pressable id="Comment" style={styles.postButton}>
              <Icon name="comment" type="material-community" color="white" />
            </Pressable>
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
    flex: -1,
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
    flex: 0.3,
    height: "100%",
  },
  username: {
    color: "#696969",
    flexWrap: "wrap",
    flex: 0.7,
    height: "100%",
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

export default SocialPost;
