import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Button, View } from "react-native";
import { DareFeed } from "../container";
import config from "../../config";
import { withNavigation } from "react-navigation";
import ImagePicker from "react-native-image-picker";
import { uploadImageCallBack } from '../../services/uploader'

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

          uploadImageCallBack(response, success=>{
          
            _this.props.navigation.navigate("createDare", { imageUrl : success.name, photo: response });
          
          }, error=>{

            console.log(error ,'error');
          })

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
            title="Add"
            color={config.styleConstants.primaryColor}
            style={[styles.addButton, { color: "red" }]}
          />
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
  }
});

export default withNavigation(MainDareFeed);
