import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList
} from "react-native";
import { Content, Container } from "native-base";
import { CommentsList } from "../container";
import AsyncStorage from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";
import config from "../../config/index";

import { postFeed } from "../../services/dataService";
import SearchBar from "react-native-dynamic-search-bar";

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenWidth: Dimensions.get("window").width,
      text: "",
      users: [],
      challenger: {}
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

  searchUser(user) {
    var _this = this;

    const url =
      config.systemConfig.baseUrl + "user/search/follower?keyword=" + user;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + _this.state.token
      }
    })
      .then(res => res.json())
      .then(response => {
        
        _this.setState({
          users: response.response.data
        });
        console.log( "users list");
      })
      .catch(err => console.log(err));
  }

  postData() {

    const _this = this;

    const { navigation } = this.props;

    const data = JSON.stringify({
      challenger_id : this.state.challenger.id,
      status: 'pending',
      userImage: navigation.getParam("imageUrl"),
    });

    var headers = config.headers;
    headers.Authorization = "Bearer " + this.state.token;
    headers["Content-Length"] = 348792;
    headers["Content-Type"] = `application/json`;

    console.log(data, "sending call");

    fetch(config.systemConfig.baseUrl + "dare", {
      method: "POST",
      headers: headers,
      body: data
    })
      .then(res => res.json())
      .then(response => {

          navigation.navigate("dares")

      })
      .catch(error => {

      });
  }

  selectChallenger(user){

    this.setState({ 

      challenger : user,
      users: []

    })
  }


  render() {
    const { navigation } = this.props;
    const imageHeight = this.state.screenWidth;

    const item = navigation.getParam("photo");
    const imageUri = item ? item.uri : "";
    const userImage = this.state.user ? this.state.user.image : "";
    const displayName = this.state.user ? this.state.user.first_name : "";
    
    return (
      <View>
        <SearchBar
          placeholder="Search here"
          onChangeText={text => {
            this.searchUser(text);
          }}
          onPressCancel={() => {
            this.filterList("");
          }}
        />

        <View>

        <Text> Selected Value : {this.state.challenger ? this.state.challenger.first_name : ''} </Text>

        </View>

        <View>
          <FlatList
            data={this.state.users}
            renderItem={({ item }) => (
              <Text
              onPress={() => this.selectChallenger(item) }
              style={{ padding: 20, fontSize: 20 }}>{item.first_name}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}

          />
        </View>


          {this.state.challenger.first_name &&  <Button
            onPress={() => {
              
              this.postData()

            }}
            title="Create"
            color={config.styleConstants.primaryColor}
            style={[styles.addButton, { color: "red" }]}
          />
          }
        


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
