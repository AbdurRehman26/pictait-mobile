import React, { Component } from 'react';
import { FriendCard } from '../common';
import {
    StyleSheet,
    FlatList,
} from 'react-native';

class FriendCards extends Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    
    
    _renderData({item}){
        
        return <FriendCard item={item} />
    }
    
    _returnKey(item){
        return item.id.toString()
    }
    
    render(){
        const items = this.props.items;
        
        return (
            <FlatList
            style={styles.container}
            data={items}
            keyExtractor={this._returnKey}
            renderItem={this._renderData}
            >
            </FlatList>
            )
        }
    }
    
    const styles = StyleSheet.create({
        root: {
            backgroundColor: "#ffffff",
            marginTop:10,
        },
        container: {
            paddingLeft: 19,
            paddingRight: 16,
            paddingVertical: 12,
        },
        content: {
            marginLeft: 16,
            flex: 1,
        },
        contentHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 6
        },
        separator: {
            height: 1,
            backgroundColor: "#CCCCCC"
        },
        image:{
            width:45,
            height:45,
            borderRadius:20,
            marginLeft:0
        },
        time:{
            fontSize:11,
            color:"#808080",
        },
        name:{
            fontSize:16,
            fontWeight:"bold",
        },
    });
    
    export default FriendCards;