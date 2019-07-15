import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import {Post} from '../presentation'

class PostFeed extends Component{
    constructor(){
        super();
    }
    _renderPost({item}){
        return <Post/>
    }

    _returnKey(item){
        return item.toString()
    }
  
render(){
    return (
        <FlatList
        data={[
            1,2,3,4,5,6,7,8,9,10
        ]}
        keyExtractor={this._returnKey}
        renderItem={this._renderPost}
        >


        </FlatList>
        )
}
}

const styles = StyleSheet.create({



});

export default PostFeed;