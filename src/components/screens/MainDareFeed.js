import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, Button, View } from 'react-native';
import {DareFeed} from '../container'
import config from '../../config'
import { withNavigation } from 'react-navigation'

class MainDareFeed extends Component{
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
            <DareFeed/>
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
});

export default withNavigation(MainDareFeed);