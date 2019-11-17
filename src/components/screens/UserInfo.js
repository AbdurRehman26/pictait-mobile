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
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === "ios" ? true : false,
            date
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
                console.log(response.response.data);
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
                _this.setState({
                    userDetails: response.response.data
                });
            })
            .catch(err => console.log(err));
    }

    updateData() {
        console.log(1111);
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
        console.log(userDetails);
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
            return <Picker.Item key={item} value={item} label={item.name} />;
        });

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
                            value={userDetails.first_name}
                            placeholder=""
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            style={styles.textInput}
                        />

                        <Text>Last Name </Text>
                        <TextInput
                            value={userDetails.last_name}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            style={styles.textInput}
                        />

                        <Text>Birthday </Text>
                        {!show && (
                            <TextInput
                                value={userDetails.dob}
                                style={styles.textInput}
                                onFocus={this.datepicker}
                            />
                        )}

                        {show && (
                            <DateTimePicker
                                value={userDetails.date_of_birth}
                                is24Hour={true}
                                display="default"
                                onChange={this.setDate}
                            />
                        )}

                        <Text>Status </Text>

                        <Picker
                            selectedValue={userDetails.status}
                            style={{ height: 50, width: 100 }}
                        >
                            {statusItems}
                        </Picker>

                        <Text>Country </Text>

                        <Picker
                            selectedValue={this.state.language}
                            style={{ height: 50, width: 400 }}
                        >
                            {countryItems}
                        </Picker>

                        <Text>About me </Text>
                        <TextInput
                            value={userDetails.bio}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            style={styles.textInput}
                        />
                    </View>

                    <Button
                        title="Update"
                        onPress={() => this.updateData()}
                    />
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
        flexDirection: 'column',
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
