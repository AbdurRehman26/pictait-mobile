import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {DareFeed} from '../container'

class MainDareFeed extends Component{
render(){
    return (
    <View style={styles.container}>
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

export default MainDareFeed;