import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  StyleSheet,
  Dimensions
} from "react-native";
import { Content, Container } from "native-base";
import { CommentsList } from "../container";
import AsyncStorage from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";
import config from "../../config/index";

import { postFeed } from "../../services/dataService";

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenWidth: Dimensions.get("window").width,
      text: ''
    };
  }

  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  componentDidMount() {
    var _this = this;

    this.retrieveItem("user")
      .then(data => {
        _this.setState({
          user: data
        });
      })
      .catch(error => {});

    this.retrieveItem("access_token")
      .then(data => {
        _this.setState({
          token: data
        });
      })
      .catch(error => {});
  }

  postData(item) {
    const data = new FormData();
    const _this = this;

    data.append("image", {
      file: item,
      uri: item.uri,
      type: item.type,
      size: item.fileSize,
      name: item.fileName
    });

    data.append("caption", this.state.text);

    var headers = config.headers;
    headers.Authorization = "Bearer " + this.state.token;
    headers["Content-Length"] = 348792;
    headers["Content-Type"] = `multipart/form-data;`;

    console.log(data, headers);

    fetch("https://pictait.com/api/post", {
      method: "POST",
      headers: headers,
      body: data
    })
      .then(res => res.json())
      .then(response => {

                _this.props.navigation.navigate("feed");


      })
      .catch(error => {
        console.log(error, 3333313);
      });
  }

  render() {
    const { navigation } = this.props;
    const imageHeight = this.state.screenWidth;

    const item = navigation.getParam("photo");
    const imageUri = item.uri;
    const userImage = this.state.user ? this.state.user.image : "";
    const displayName = this.state.user ? this.state.user.first_name : "";

    return (
      <View style={styles.container}>
        <View style={styles.userBar}>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.userPic} source={{ uri: userImage }} />

            <View style={{ justifyContent: "flex-start" }}>
              <TextInput
                style={{ height: 40 }}
                placeholder="Type here to translate!"
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            padding: 10,
            marginLeft: 10,
            alignContent: "space-around",
            alignItems: "flex-start"
          }}
        />

        <View>
          <Image
            style={{ width: imageHeight, height: imageHeight * 1.1 }}
            source={{ uri: imageUri }}
          />
        </View>

        <View style={styles.iconBar} />

        <Button
          onPress={() => {
            this.postData(item);
          }}
          title="Save"
          color={config.styleConstants.primaryColor}
          style={[styles.addButton, { color: "red" }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userPic: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginBottom: 10
  },
  userBar: {
    paddingTop: 10,
    flexDirection: "row",
    width: 100 + "%",
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },

  container: {
    flex: 1,
    width: 100 + "%"
  },
  iconBar: {
    height: config.styleConstants.defaultRowHeight + 10,
    borderColor: "rgb(233,233,233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icon: {
    height: config.styleConstants.defaultRowHeight - 10,
    width: config.styleConstants.defaultRowWidth - 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10
  },
  commentsBar: {
    paddingBottom: 10,
    height: config.styleConstants.defaultRowHeight + 5,
    borderColor: "rgb(233,233,233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default withNavigation(CreatePost);
