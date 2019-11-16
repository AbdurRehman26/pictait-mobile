import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../../config";

class UserInfo extends Component {
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
        });

        this.retrieveItem("user").then(data => {
            _this.setState({
                user: data
            });
            _this.fetchData();
        });
    }

    fetchData() {
        var _this = this;
        const user = this.state.user;
        fetch(
            config.systemConfig.baseUrl +
                "dare?pagination=true&user_id=" +
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header} />
                <Image
                    style={styles.avatar}
                    source={{
                        uri:
                            "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>John Doe</Text>
                        <Text style={styles.info}>
                            UX Designer / Mobile developer
                        </Text>
                        <Text style={styles.description}>
                            Lorem ipsum dolor sit amet, saepe sapientem eu nam.
                            Qui ne assum electram expetendis, omittam deseruisse
                            consequuntur ius an,
                        </Text>

                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 2</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

 header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },



});

export default UserInfo;
