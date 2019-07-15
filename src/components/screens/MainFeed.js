import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {PostFeed} from '../container'

class MainFeed extends Component{
render(){

    return (
    <View style={styles.container}>
        <View style={styles.navBar}>
        <Text>INSTAGRAM</Text>
        </View>
        <View>
            <PostFeed/>
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
  navBar : {
    width: 100 + '%',
    height: 75,
    marginTop : 20,
    backgroundColor: '#dbdbdb',
    borderBottomColor : 'white',
    borderBottomWidth : StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems : 'center',

}

});

export default MainFeed;