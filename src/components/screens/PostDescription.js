import React, {Component} from 'react';
import { Image, Text, View, Dimensions} from 'react-native';
import { Content, Container, Button, Icon} from 'native-base';
import {Post} from '../presentation'
import {CommentsList} from '../container'

class PostDescription extends Component{
  constructor(props){
    super(props)

    this.state = {
      activeIndex : 0
    }
  
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
      
      
      <Post item={item} />
      
      </View>
      
      </View>
      
      </View>

      <View>
      <View style={{ flexDirection : 'row', justifyContent : 'space-around', borderTopWidth : 1, borderTopColor : '#eae5e5'}}>

        <CommentsList items={item.post.comments} />


      </View>
      </View>

      </View>
      </Content>
      </Container>
      );
    }
  }
  
  export default PostDescription;