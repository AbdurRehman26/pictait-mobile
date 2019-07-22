import React, {Component} from 'react';
import { StyleSheet, Button, View } from 'react-native';
import {PostFeed} from '../container'

class MainFeed extends Component{
constructor (props) {
  super(props);
}

render(){
    return (
    <View style={styles.container}>
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
});

MainFeed.navigationOptions = ({ /*navigation*/ }) => {
  return {
      header: null
  }
}

export default MainFeed;