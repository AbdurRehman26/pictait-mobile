import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Button, View } from "react-native";
import { PostFeed } from "../container";
import config from "../../config";
import { withNavigation } from "react-navigation";
import ImagePicker from "react-native-image-picker";

class MainFeed extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    photo: null
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.props.navigation.navigate("createPost", { photo: response });
      }
    });
  
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ margin: 20 }} activeOpacity={1}>
          <Button
            onPress={() => {
              this.handleChoosePhoto();
            }}
            title="Add 2"
            color={config.styleConstants.primaryColor}
            style={[styles.addButton, { color: "red" }]}
          />
        </TouchableOpacity>

        <View>
          <PostFeed />
        </View>
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

MainFeed.navigationOptions = (
  {
    /*navigation*/
  }
) => {
  return {
    header: null
  };
};

export default withNavigation(MainFeed);
