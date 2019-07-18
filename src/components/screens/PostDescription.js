import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import {Post} from '../presentation'

class PostDescription extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            liked : false,
            screenWidth : Dimensions.get('window').width
        }
        
    }
    
    render(){
        
        
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        return (
                <Post item={item} />
            );
        }
    }
    
    const styles = StyleSheet.create({
    });
    
    export default PostDescription;