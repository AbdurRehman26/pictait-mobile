import React, {Component} from 'react';
import { TextInput, View, Image} from 'react-native';
import { Content, Container} from 'native-base';
import {Post} from '../presentation'
import {CommentsList} from '../container'
import AsyncStorage from '@react-native-community/async-storage';

class PostDescription extends Component{
  constructor(props){
    super(props)
    
    this.state = {
      activeIndex : 0
    }
    
  }
  
  componentDidMount() {

    var _this = this;
    this.retrieveItem('user').then(data=>{
      _this.setState({
        user : data
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
  render(){
    

    const { navigation } = this.props;
    const item = navigation.getParam('item');
    
    return (
      <Container style={{ paddingTop: 10, flex : 1 , backgroundColor : 'white'}}>
      <Content>
      <View>
      <View style={{flexDirection : 'row'}}>
      
      
      <View style={{ flex : 3 }}>
      
      
      <View style={{ flexDirection : 'row', paddingTop: 10 }}>
      
      
      <Post post={item}  user={item.user} />
      
      </View>
      
      </View>
      
      </View>
      
      <View>
      <View style={{ flexDirection : 'row', justifyContent : 'space-around', borderTopWidth : 1, borderTopColor : '#eae5e5'}}>
      
      <CommentsList items={item.comments} />
      
        <View style={{ borderBottomWidth : 1, borderBottomColor : '#eae5e5', backgroundColor: 'white',alignItems: 'center',width:'100%'}}>
        
        <Image  style={{width : 50 , height : 50}} source={{uri : 'http://microsolresources.com/wp-content/uploads/2015/07/capture1.png'}}    />
        <TextInput
        multiline={true}
        style={{backgroundColor: 'white'}}
        />
        </View>
      
      </View>
      </View>
      
      </View>
      </Content>
      </Container>
      );
    }
  }
  
  export default PostDescription;