import React, { Component } from "react";
import { Image, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { Content, Container, Button } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Timeline, Follower, Following, Dare } from "../screens/profile";

import { EventFeed } from "../container";

import { withNavigation } from "react-navigation";

var width = Dimensions.get("window").width;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  componentDidMount() {
    var _this = this;
    this.retrieveItem("user").then(data => {
      _this.setState({
        user: data
      });
    });
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

  segmentClicked = index => {
    this.setState({
      activeIndex: index
    });
  };

  renderSection = () => {
    if (this.state.activeIndex == 0) {
      return <Timeline />;
    }

    if (this.state.activeIndex == 1) {
      return <Following />;
    }

    if (this.state.activeIndex == 2) {
      return <Follower />;
    }

    if (this.state.activeIndex == 3) {
      return <Dare />;
    }

    if (this.state.activeIndex == 4) {
      return <EventFeed user={this.state.user} />;
    }
  };

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam("user")
      ? navigation.getParam("user")
      : this.state.user;

    return (
      <Container style={{ paddingTop: 10, flex: 1, backgroundColor: "white" }}>
        <Content>
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  style={{ width: 75, height: 75, borderRadius: 37.5 }}
                  source={{ uri: user ? user.image : "" }}
                />
              </View>

              <View style={{ flex: 3 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text>10</Text>
                    <Text style={{ fontSize: 15, color: "gray" }}>Posts</Text>
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <Text>15</Text>
                    <Text style={{ fontSize: 15, color: "gray" }}>
                      Followings
                    </Text>
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <Text>5</Text>
                    <Text style={{ fontSize: 15, color: "gray" }}>
                      Followers
                    </Text>
                  </View>
                </View>

                <View>
                  <TouchableOpacity activeOpacity={1}>
                    <Button
                      onPress={() => {
                        this.props.navigation.navigate("userInfo");
                      }}
                      bordered
                      dark
                      style={{
                        flex: 3,
                        marginLeft: 10,
                        justifyContent: "center",
                        height: 30
                      }}
                    >
                      <Text>Edit Profile</Text>
                    </Button>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
              <Text style={{ fontWeight: "bold" }}>
                {user ? user.first_name : ""} {user ? user.last_name : ""}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderTopWidth: 1,
                  borderTopColor: "#eae5e5"
                }}
              >
                <Button
                  transparent
                  onPress={() => this.segmentClicked(0)}
                  active={this.state.activeIndex == 0}
                >
                  <Icon
                    name="image"
                    style={[
                      this.state.activeIndex == 0 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>

                <Button
                  transparent
                  onPress={() => this.segmentClicked(1)}
                  active={this.state.activeIndex == 1}
                >
                  <Icon
                    name="user-plus"
                    style={[
                      this.state.activeIndex == 1 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>

                <Button
                  transparent
                  onPress={() => this.segmentClicked(2)}
                  active={this.state.activeIndex == 2}
                >
                  <Icon
                    name="users"
                    style={[
                      this.state.activeIndex == 2 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>

                <Button
                  transparent
                  onPress={() => this.segmentClicked(3)}
                  active={this.state.activeIndex == 3}
                >
                  <Icon
                    name="modx"
                    style={[
                      this.state.activeIndex == 3 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>

                <Button
                  transparent
                  onPress={() => this.segmentClicked(4)}
                  active={this.state.activeIndex == 4}
                >
                  <Icon
                    name="calendar"
                    style={[
                      this.state.activeIndex == 4 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>
              </View>
            </View>

            {this.renderSection()}
          </View>
        </Content>
      </Container>
    );
  }
}

export default withNavigation(Profile);
