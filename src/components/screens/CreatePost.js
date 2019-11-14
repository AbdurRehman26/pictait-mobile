import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Button, View } from "react-native";
import { PostFeed } from "../container";
import config from "../../config";
import { withNavigation } from "react-navigation";
import ImagePicker from "react-native-image-picker";

class CreatePost extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    photo: null
  };

  handleChoosePhoto = () => {};

  render() {
    return (
      <View style={styles.container}>
          <PostFeed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + "%",
    height: 100 + "%"
  },
  addButton: {}
});

CreatePost.navigationOptions = (
  {
    /*navigation*/
  }
) => {
  return {
    header: null
  };
};

export default withNavigation(CreatePost);
