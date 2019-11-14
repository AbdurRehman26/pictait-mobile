import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Event } from "../presentation";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../../config";
import { withNavigation } from "react-navigation";

class EventFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        var _this = this;
        this.retrieveItem("access_token").then(data => {
            _this.setState({
                access_token: data
            });
            _this.fetchData();
        });
    }

    fetchData() {
        var _this = this;

        var fetchUrl = config.systemConfig.baseUrl + "event?pagination=true";

        if (this.props.user && this.props.user.id) {
            fetchUrl += "&user_id=" + this.props.user.id;
        }

        console.log(fetchUrl);

        fetch(fetchUrl, {
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
                    items: response.response.data
                });
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

    _renderData({ item }) {
        return <Event item={item} />;
    }

    _returnKey(item) {
        return item.id.toString();
    }

    render() {
        const items = this.state.items;

        return (
            <FlatList
                style={styles.container}
                data={items}
                keyExtractor={this._returnKey}
                renderItem={this._renderData}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});

export default withNavigation(EventFeed);
