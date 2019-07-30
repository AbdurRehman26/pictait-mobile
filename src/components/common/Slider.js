import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import config from '../../config'
import ImageSlider from 'react-native-image-slider';
import AsyncStorage from '@react-native-community/async-storage';

class Slider extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            screenWidth : Dimensions.get('window').width,
            items : []
        }
    }

    componentDidMount(){
        var _this = this;
        this.retrieveItem('access_token').then(data=>{
            _this.setState({
                access_token : data
            })             
        });


    }

    lastTap = null;
    handleDoubleTap = (item) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
            this.likeOrUnlike(item);
        } else {
            this.lastTap = now;
        }
    }
    


    likeOrUnlike(item){

        var _this = this;

        
        var  postData = JSON.stringify({
            event_id : _this.props.eventData.id,
            liked : false
        })
        
        fetch(config.systemConfig.baseUrl+'event-entry/update-like/'+item._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Bearer '+ _this.state.access_token
            },
            body : postData
        }).then((res) => res.json()).then((response) =>  {
            
            console.log(response.response);
            // _this.props.post = response.response.data;
            
        }).catch((err)=>console.log(err))
        
    }

    async retrieveItem(key) {
        try {
            const retrievedItem =  await AsyncStorage.getItem(key);
            const item = JSON.parse(retrievedItem);
            return item;
        } catch (error) {
            console.log(error.message);
        }
        return
    }

    
    render() {
        var _this = this
 
        const images = []
        
        const items = this.props.items

        items.forEach(element => {
            images.push(element.entry.upload_url)
        });
        
        return (
            <View>
            <ImageSlider
            loop
            images={images}
            onPress={({ index }) => alert(index)}
            customSlide={({ index, item, style, width }) => (
                <View
                key={index}
                style={[
                    style,
                    styles.customSlide
                ]}
                >
                
                
                <TouchableOpacity
                style={{flexDirection : 'row'}}
                activeOpacity={1}
                onPress={()=>{
                    _this.handleDoubleTap(_this.props.items[index])
                }}
                >
                
                <Image source={{ uri: item }} style={[{width : this.state.screenWidth, height : this.state.screenWidth}]} />
                
                </TouchableOpacity>
                
                </View>
                )}
                customButtons={(position, move) => (
                    <View style={styles.buttons}>
                    {images.map((image, index) => {
                        return (
                            <TouchableHighlight
                            key={index}
                            underlayColor="#ccc"
                            onPress={() => move(index)}
                            style={styles.button}
                            >
                            <Text style={position === index && styles.buttonSelected}>
                            {index + 1}
                            </Text>
                            </TouchableHighlight>
                            );
                        })}
                        </View>
                        )}
                        />
                        </View>
                        );
                    }
                }
                
                const styles = StyleSheet.create({
                    slider: { backgroundColor: '#000', height: 500 },
                    buttons: {
                        zIndex: 1,
                        height: 15,
                        marginTop: -25,
                        marginBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    },
                    button: {
                        margin: 3,
                        width: 15,
                        height: 15,
                        opacity: 0.9,
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    buttonSelected: {
                        opacity: 1,
                        color: 'red',
                    },
                    customSlide: {
                        backgroundColor: 'green',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                });
                export default Slider;