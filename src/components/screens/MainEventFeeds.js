import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {EventFeed} from '../container'



class MainEventFeeds extends Component{
constructor (props) {
  super(props);
}

render(){
    return (
    <View style={styles.container}>
        <View>
            <EventFeed />
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

MainEventFeeds.navigationOptions = ({ /*navigation*/ }) => {
  return {
      header: null
  }
}

export default MainEventFeeds;