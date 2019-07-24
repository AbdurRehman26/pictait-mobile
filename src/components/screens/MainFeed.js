import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, Button, View } from 'react-native';
import {PostFeed} from '../container'
import config from '../../config'
import { withNavigation } from 'react-navigation'

class MainFeed extends Component{
  constructor (props) {
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
      
      <TouchableOpacity
      style={{margin : 20}}
      activeOpacity={1}
      >
      <Button 
      onPress={()=>{
        this.props.navigation.navigate('camera')

      }} 
      title='Add'
      color={config.styleConstants.primaryColor}
      style={[styles.addButton , {color : 'red'}]} 
      />
      </TouchableOpacity>
      
      
      <View>
      <PostFeed />
      </View>
      </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      width: 100 + '%',
      height: 100 + '%'
    },
    addButton : {
    }
  });
  
  MainFeed.navigationOptions = ({ /*navigation*/ }) => {
    return {
      header: null
    }
  }
  
  export default withNavigation(MainFeed);