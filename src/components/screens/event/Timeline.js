import React, {Component} from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config'
import {Slider} from '../../common'

class Timeline extends Component{
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

        this.retrieveItem('eventData').then(data=>{
            _this.setState({
                eventData : data
            }) 
            _this.fetchPosts()
            
        });


    }
    
    fetchPosts(){

        var _this = this;
        const event_id = this.state.eventData.id
        
        fetch(config.systemConfig.baseUrl+'event-entry?status=1&pagination=true&event_id='+event_id, {
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
            <Slider items={items} eventData={this.state.eventData} />
            )
        }
    }
    
    const styles = StyleSheet.create({
        container : {
            marginTop : 20,
        }
    });
    
    export default Timeline;