import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Content, Container, Button } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Timeline, Follower } from "../screens/event";
import Ionicons from "react-native-vector-icons/Ionicons";

import config from "../../config/index";

var width = Dimensions.get("window").width;

var images = [];

class EventMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenWidth: Dimensions.get("window").width / 4,
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

  renderSectionOne = () => {
    return images.map((image, index) => {
      return (
        <View
          key={index}
          style={[
            { width: width / 3 },
            { height: width / 3 },
            { marginBottom: 2 },
            index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }
          ]}
        >
          <Image style={{ flex: 1 }} source={{ uri: image }} />
        </View>
      );
    });
  };

  renderSection = eventData => {
    if (this.state.activeIndex == 0) {
      return <Timeline eventData={eventData} />;
    }

    if (this.state.activeIndex == 1) {
      return <Follower eventData={eventData} />;
    }
  };

  render() {
    const { navigation } = this.props;
    const eventData = navigation.getParam("item");

    const imageHeight = this.state.screenWidth;
    const imageUri = eventData.displayImage;

    AsyncStorage.setItem("eventData", JSON.stringify(eventData));

    return (
      <View style={styles.container}>
        <Container style={{ backgroundColor: "white", marginTop: 20 }}>
          <Content>
            <View style={styles.userBar}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                activeOpacity={1}
              >
                <View style={{ justifyContent: "flex-start" }}>
                  <Text style={{ fontWeight: "bold" }}>{eventData.name}</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    Created: {eventData.formatted_created_at}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity activeOpacity={1}>
                <Image
                  style={[
                    styles.image,
                    { width: imageHeight, height: imageHeight * 1.1 }
                  ]}
                  source={{ uri: imageUri }}
                />
              </TouchableOpacity>

              <Text style={{ padding: 10 }}>{eventData.description}</Text>
            </View>

                <View style={styles.bottomBar}>
                    <Text
                        style={[
                            styles.icon,
                            { width: config.styleConstants.defaultRowWidth }
                        ]}
                    >
                        <Ionicons name="ios-contacts" size={25} />

                        {eventData.followers ? eventData.followers : "0"}
                    </Text>

                    <Text
                        style={[
                            styles.icon,
                            { width: config.styleConstants.defaultRowWidth }
                        ]}
                    >
                        <Ionicons name="ios-images" size={25} color="#6c50a5" />

                        {eventData.number_of_images}
                    </Text>

                    <Text
                        style={[
                            styles.icon,
                            { width: config.styleConstants.defaultRowWidth }
                        ]}
                    >
                        <Ionicons name="ios-lock" size={25} />

                        {eventData.privacy_type}
                    </Text>

                    <Text
                        style={[
                            styles.icon,
                            { width: config.styleConstants.defaultRowWidth }
                        ]}
                    >
                        <Ionicons
                            name="ios-skip-backward"
                            color="green"
                            size={25}
                        />

                        {eventData.status}
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
              </View>
            </View>

            {this.renderSection(eventData)}
          </Content>
        </Container>
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
    flexDirection: "row",
    width: 100 + "%",
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },

  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
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
    borderRightWidth: 1,
    height: config.styleConstants.defaultRowHeight - 10,
    width: config.styleConstants.defaultRowWidth - 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10
  },
  bottomBar: {
    marginLeft: 10,
    paddingBottom: 10,
    height: config.styleConstants.defaultRowHeight + 5,
    borderColor: "rgb(233,233,233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    borderRadius: 20,
    marginLeft: 20,
    marginTop: 10
  }
});

export default EventMain;
