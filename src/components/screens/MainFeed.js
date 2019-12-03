import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { PostFeed } from "../container";
import config from "../../config";
import { withNavigation } from "react-navigation";
import ImagePicker from "react-native-image-picker";
import SpinnerButton from "react-native-spinner-button";
import customStyles from "../../styles";

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
        <TouchableOpacity style={{ margin: 10 }} activeOpacity={1}>
          <SpinnerButton
            buttonStyle={customStyles.defaultButton}
            onPress={() => {
              this.handleChoosePhoto();
            }}
            indicatorCount={10}
          >
            <Text style={customStyles.defaultButtonText}>ADD</Text>
          </SpinnerButton>
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
