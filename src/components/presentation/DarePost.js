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
import AsyncStorage from "@react-native-community/async-storage";
import {
    Card,
    CardImage,
    CardTitle,
    CardContent,
    CardAction
} from "react-native-card-view";

class DarePost extends Component {
    lastTap = null;
    handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (this.lastTap && now - this.lastTap < DOUBLE_PRESS_DELAY) {
            this.likeToggled();
        } else {
            this.lastTap = now;
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            screenWidth: Dimensions.get("window").width / 2 - 1,
            likeCount: 0
        };
        let _this = this;

        this.retrieveItem("access_token").then(data => {
            _this.setState({
                access_token: data
            });
        });
    }

    componentDidMount() {
        var _this = this;

        this.setState({
            liked: _this.props.liked,
            likeCount: _this.props.likeCount
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

    likeToggled() {
        let _this = this;

        this.setState({
            liked: !_this.state.liked
        });
        _this.likeOrUnlike();
    }

    likeOrUnlike() {
        var _this = this;

        var postData = JSON.stringify({
            id: _this.props.itemId,
            type: _this.props.type,
            user_like_id: _this.props.user.id,
            liked: _this.state.liked
        });

        if (!this.state.liked) {
            this.state.likeCount += 1;
        } else {
            this.state.likeCount -= 1;
        }

        fetch(config.systemConfig.baseUrl + "dare/like/" + this.props.itemId, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + _this.state.access_token
            },
            body: postData
        })
            .then(res => res.json())
            .then(response => {
                console.log(response.response);
                // _this.props.post = response.response.data;
            })
            .catch(err => console.log(err));
    }

    navigateToProfile(user) {
        this.props.navigation.navigate("profile", { user: user });
    }

    render() {
        const imageHeight = this.state.screenWidth;
        const imageUri = this.props.userImage ? this.props.userImage : "";
        const userImage = this.props.user ? this.props.user.file_path : "";
        const heartLikedColor = this.state.liked ? "rgb(252,61,57)" : null;
        const displayName = this.props.user.first_name
            ? this.props.user.first_name
            : "" + " " + this.props.user.last_name
            ? this.props.user.last_name
            : "";
        const likeCount = this.state.likeCount;

        return (
            <Card>
                <View elevation={1} style={styles.container}>
                    <View>
                        <TouchableOpacity
                            style={{ flexDirection: "row" }}
                            activeOpacity={1}
                            onPress={() => {
                                this.navigateToProfile(this.props.user);
                            }}
                        >
                            <Image
                                style={styles.userPic}
                                source={{ uri: userImage }}
                            />

                            <CardContent>
                                <Text style={styles.title}>{displayName}</Text>
                            </CardContent>
                        </TouchableOpacity>
                    </View>

                    <CardImage>
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
                    </CardImage>

                    <CardAction>
                        <TouchableOpacity
                            onPress={() => {
                                this.handleDoubleTap();
                            }}
                        >
                            <Image
                                style={[
                                    styles.icon,
                                    { tintColor: heartLikedColor }
                                ]}
                                source={config.image.likeIcon}
                            />
                        </TouchableOpacity>
                        <Text
                            style={[
                                styles.icon,
                                {
                                    width:
                                        config.styleConstants.defaultRowWidth +
                                        35
                                }
                            ]}
                        >
                            {likeCount ? likeCount : 0} Likes
                        </Text>
                    </CardAction>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderLeftWidth: 0.5,
    },
    title: {
        fontSize: 14,
        backgroundColor: "transparent",
        marginTop: -10,
        marginLeft: -10
    },
    userPic: {
        padding: 5,
        height: 35,
        width: 35,
        borderRadius: 20
    },
    userBar: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        width: 100 + "%",
        height: 40,
        backgroundColor: "#fff",
        justifyContent: "space-between"
    },

    iconBar: {
        height: config.styleConstants.defaultRowHeight + 1,
        borderColor: "rgb(233,233,233)",
        flexDirection: "row"
    },
    icon: {
        height: config.styleConstants.defaultRowHeight - 20,
        width: config.styleConstants.defaultRowWidth - 20,
        marginTop: 10,
        marginLeft: 5
    },
    image: {
        borderRadius: 15,
        borderWidth: 10
    }
});

export default withNavigation(DarePost);
