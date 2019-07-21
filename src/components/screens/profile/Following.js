import React, {Component} from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {Post} from '../../presentation'
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config'

class Following extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            items : []
        }
    }
    
    
    componentDidMount() {
        var _this = this;
        this.retrieveItem('access_token').then(data=>{
            _this.setState({
                access_token : data
            })             
        });

        this.retrieveItem('user').then(data=>{
            _this.setState({
                user : data
            }) 
            _this.fetchPosts()
            
        });


    }
    
    fetchPosts(){
        var _this = this;
        const user_id = this.state.user.id

        fetch(config.systemConfig.baseUrl+'follower?pagination=true&user_id='+user_id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Bearer '+ _this.state.access_token
            }
        }).then((res) => res.json()).then((response) =>  {
            _this.setState({
                items : response.response.data
            })
            
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

    _renderPost({item}){
        return <Post post={item} user={item.user} />
    }
    
    _returnKey(item){
        return item._id.toString()
    }
    
    render(){
        const items = this.state.items;
        
        return (
            <FlatList
            style={styles.container}
            data={items}
            keyExtractor={this._returnKey}
            renderItem={this._renderPost}
            >
            </FlatList>
            )
        }
    }
    
    const styles = StyleSheet.create({
        container : {
            marginTop : 20,
        }
    });
    
    export default Following;