import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import ImageSlider from 'react-native-image-slider';

class Slider extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            screenWidth : Dimensions.get('window').width,
          }
              
    }
    
    
    render() {
        const items = this.props.items
        const images = []


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
                <Image source={{ uri: item }} style={[{width : this.state.screenWidth, height : this.state.screenWidth}]} />
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