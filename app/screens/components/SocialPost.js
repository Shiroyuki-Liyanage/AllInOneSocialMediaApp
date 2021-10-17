import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";

class SocialPost extends Component {
  render() {
    return (
      <View style={styles.FullPost}>
        <View style={styles.topPost}>
          <View>
            <Image
              style={styles.profileImg}
              source={{ uri: this.props.imageURL }}
            />
          </View>
          <View>
            <Text style={styles.displayName}>
              {this.props.name}
              <Text style={styles.username}> @{this.props.username}</Text>
            </Text>
            <Text style={styles.body}>{this.props.body}</Text>
          </View>
        </View>
        <View styles={styles.bottomPost}>
          <Button title="Link" style={styles.linkBtn} />
          <Button title="Comment" style={styles.commentBtn} />
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
  bottomPost: {
    flexDirection: "row",
  },
  displayName: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10,
    flexWrap: "wrap",
    width: "45%",
  },
  username: {
    color: "#696969",
    flexWrap: "wrap",
    width: "45%",
  },
  body: {
    color: "white",
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
    width: "45%",
    flexWrap: "wrap",
  },
  profileImg: {
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  linkBtn: {
    flex: 1,
    backgroundColor: "black",
  },
  commentBtn: {
    flex: 1,
  },
});

export default SocialPost;
