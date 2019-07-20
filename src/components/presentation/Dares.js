import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from '../../config/index'
import { withNavigation } from 'react-navigation'
import {DarePost} from '../presentation'

class Dare extends Component{
    
    constructor(props){
        super(props);
    }
    
    
    render(){

        const item = this.props.item
        
        return (
            <View style={{ flex : 1 , flexDirection : 'row'}}>
                
            <DarePost userImage={item.userImage} user={item.user} item={item} />
            <DarePost userImage={item.challengerImage} user={item.challenger} item={item} />
            
            </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
    });
    
    export default withNavigation(Dare);