import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { DareFeed } from "../container";
import config from "../../config";
import { withNavigation } from "react-navigation";
import ImagePicker from "react-native-image-picker";
import { uploadImageCallBack } from "../../services/uploader";
import SpinnerButton from "react-native-spinner-button";
import customStyles from '../../styles';

class MainDareFeed extends Component {
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

    const _this = this;

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        uploadImageCallBack(
          response,
          success => {
            _this.props.navigation.navigate("createDare", {
              imageUrl: success.name,
              photo: response
            });
          },
          error => {
            console.log(error, "error");
          }
        );
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
          <DareFeed />
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
});

export default withNavigation(MainDareFeed);
