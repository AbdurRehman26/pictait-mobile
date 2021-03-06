import React, {Component} from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {FriendCards} from '../../common'
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config'

class Follower extends Component{
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

            _this.fetchData()
        });
                
    }
    
    fetchData(){
        var _this = this;
        const follow_id = this.props.eventData.id

        fetch(config.systemConfig.baseUrl+'follower?pagination=true&follow_id='+follow_id, {
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
    
    render(){
        const items = this.state.items;
        
        return (
            <FriendCards items={items} />
            )
        }
    }
    
    const styles = StyleSheet.create({
        container : {
            marginTop : 20,
        }
    });
    
    export default Follower;