import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
    Picker
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../../config";
import DateTimePicker from "@react-native-community/datetimepicker";

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            show: false,
            mode: "date",
            date: new Date("2020-06-12T14:42:42"),
            userDetails: [],
            countries: [],
            maritalStatus: [
                {
                    id: "married",
                    name: "Married"
                },
                {
                    id: "single",
                    name: "Single"
                }
            ]
        };
    }

    setDate = (event, date) => {
        console.log(date ,33333);
        this.setState({
            show: Platform.OS === "ios" ? true : false,
            date_of_birth: date
        });
    };

    show = mode => {
        this.setState({
            show: true,
            mode
        });
    };

    datepicker = () => {
        this.show("date");
    };

    componentDidMount() {
        var _this = this;
        this.retrieveItem("access_token").then(data => {
            _this.setState({
                access_token: data
            });
        });

        this.retrieveItem("user").then(data => {
            _this.setState({
                user: data
            });
            _this.fetchData();
            _this.fetchCountries();
        });
    }

    fetchCountries() {
        var _this = this;
        const user = this.state.user;
        fetch(
            config.systemConfig.baseUrl +
                "country?pagination=true&user_id=" +
                user.id,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + _this.state.access_token
                }
            }
        )
            .then(res => res.json())
            .then(response => {
                _this.setState({
                    countries: response.response.data
                });
            })
            .catch(err => console.log(err));
    }

    fetchData() {
        var _this = this;
        fetch(config.systemConfig.baseUrl + "user-detail", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + _this.state.access_token
            }
        })
            .then(res => res.json())
            .then(response => {
                const userDetails = response.response.data;

                _this.setState({
                    userDetails
                });

                for (var i in userDetails) {
                    _this.state[i] = userDetails[i];
                }
            })
            .catch(err => console.log(err));
    }

    updateData() {
        var _this = this;

        var facebookUserData = _this.state.facebookUserData;

        var postData = JSON.stringify({
            provider_access_token: facebookUserData.credentials.token,
            email: facebookUserData.profile.email,
            first_name: facebookUserData.profile.name,
            provider_id: facebookUserData.profile.id,
            image: facebookUserData.profile.picture.data.url
        });

        fetch(config.systemConfig.baseUrl + "user", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + _this.state.access_token
            },
            body: postData
        })
            .then(res => res.json())
            .then(response => {
                _this.setState({
                    user: response.data.user,
                    token: response.data.token
                });

                AsyncStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                AsyncStorage.setItem(
                    "access_token",
                    JSON.stringify(response.data.token)
                );
                AsyncStorage.setItem(
                    "fb_access_token",
                    JSON.stringify(facebookUserData.credentials.token)
                );

                _this.navigateToMainScreen();
            })
            .catch(err => console.log(err));
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

    render() {
        const { show, date, mode } = this.state;

        const userDetails = this.state.userDetails;
        console.log(this.state);
        const user = this.state.user;
        const userImage = user
            ? user.image
            : "https://bootdey.com/img/Content/avatar/avatar6.png";

        let countryItems = this.state.countries.map((item, index) => {
            return (
                <Picker.Item key={item.id} value={item.id} label={item.name} />
            );
        });

        let statusItems = this.state.maritalStatus.map((item, index) => {
            return <Picker.Item key={item.id} value={item.id} label={item.name} />;
        });


        this.state.date_of_birth = this.state.date_of_birth ? new Date(this.state.date_of_birth) : this.state.date_of_birth;

        return (
            <View style={styles.container}>
                <View style={styles.header} />
                <Image
                    style={styles.avatar}
                    source={{
                        uri: userImage
                    }}
                />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text>First Name </Text>
                        <TextInput
                            value={this.state.first_name}
                            placeholder=""
                            style={styles.textInput}
                            onChangeText={first_name =>
                                this.setState({ first_name })
                            }
                        />

                        <Text>Last Name </Text>
                        <TextInput
                            value={this.state.last_name}
                            style={styles.textInput}
                            onChangeText={last_name =>
                                this.setState({ last_name })
                            }
                        />

                        <Text>Birthday </Text>
                        {!show && (
                            <TextInput
                                value={this.state.date_of_birth}
                                style={styles.textInput}
                                onFocus={this.datepicker}
                            />
                        )}

                        {show && (
                            <DateTimePicker
                                value={this.state.date_of_birth}
                                is24Hour={true}
                                display="default"
                                onChange={this.setDate}
                            />
                        )}

                        <Text>Status </Text>


                        {this.state.status && (
                        <Picker
                            selectedValue={this.state.status.id}
                            style={{ height: 50, width: 100 }}
                        >
                            {statusItems}
                        </Picker>
                        )}

                        <Text>Country </Text>

                        {this.state.country && (
                            <Picker
                                selectedValue={this.state.country.id}
                                style={{ height: 50, width: 400 }}
                            >
                                {countryItems}
                            </Picker>
                        )}

                        <Text>About me </Text>
                        <TextInput
                            value={this.state.bio}
                            style={styles.textInput}
                            onChangeText={bio => this.setState({ bio })}
                        />
                    </View>

                    <Button title="Update" onPress={() => this.updateData()} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40
    },
    header: {
        backgroundColor: "#00BFFF",
        height: 60
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: "center",
        position: "absolute",
        marginTop: 0
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: "600"
    },
    body: {
        flexDirection: "column",
        marginTop: 40
    },
    bodyContent: {
        flex: 1,
        padding: 30
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: "row",
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF"
    }
});

export default UserInfo;
