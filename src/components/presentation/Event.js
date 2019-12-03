import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import config from "../../config/index";
import { withNavigation } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: Dimensions.get("window").width / 4
        };
    }

    render() {
        const imageHeight = this.state.screenWidth;
        const imageUri = this.props.item.displayImage;
        const item = this.props.item;

        this.props.navigation.navigate("eventMain", {
            item: this.props.item
        });

        return (
            <View style={styles.container}>
                <View style={styles.userBar}>
                    <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        activeOpacity={1}
                        onPress={() => {
                            this.props.navigation.navigate("eventMain", {
                                item: this.props.item
                            });
                        }}
                    >
                        <View style={{ justifyContent: "flex-start" }}>
                            <Text style={{ fontWeight: "bold" }}>
                                {item.name}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                Created: {item.formatted_created_at}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.props.navigation.navigate("eventMain", {
                                item: this.props.item
                            });
                        }}
                    >
                        <Image
                            style={[
                                styles.image,
                                {
                                    width: imageHeight,
                                    height: imageHeight * 1.1
                                }
                            ]}
                            source={{ uri: imageUri }}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            padding: 10,
                            marginLeft: 5,
                            marginRight: 15,
                            alignContent: "space-around",
                            alignItems: "flex-start"
                        }}
                    >
                        <Text>{item.description}</Text>
                    </View>
                </View>

                <View style={styles.bottomBar}>
                    <Text
                        style={[
                            styles.icon,
                            { width: config.styleConstants.defaultRowWidth }
                        ]}
                    >
                        <Ionicons name="ios-contacts" size={25} />

                        {item.followers ? item.followers : "0"}
                    </Text>

                    <Text
                        style={[
                            styles.icon,
                            { width: config.styleConstants.defaultRowWidth }
                        ]}
                    >
                        <Ionicons name="ios-images" size={25} color="#6c50a5" />

                        {item.number_of_images}
                    </Text>

                    <Text
                        style={[
                            styles.icon,
                            { width: config.styleConstants.defaultRowWidth }
                        ]}
                    >
                        <Ionicons name="ios-lock" size={25} />

                        {item.privacy_type}
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

                        {item.status}
                    </Text>
                </View>
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
        marginTop: 10
    },
    bottomBar: {
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        height: config.styleConstants.defaultRowHeight + 5,
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    image: {
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 10
    }
});

export default withNavigation(Event);
