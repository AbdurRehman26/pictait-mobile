import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import {Post} from '../presentation'
import AsyncStorage from '@react-native-community/async-storage';

class PostFeed extends Component{
    constructor(){
        super();
        var _this = this;

        this.retrieveItem('access_token').then(data=>{
            _this.setState({
                access_token : data
            }) 
        });

        

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