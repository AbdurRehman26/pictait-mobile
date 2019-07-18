import React, {Component} from 'react';
import { Image, Text, View, Dimensions} from 'react-native';
import { Content, Container, Button, Icon} from 'native-base';
import {Post} from '../presentation'
import {CommentsList} from '../container'


var width = Dimensions.get('window').width

var images = [
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833',
    'https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQlsFdKnqkbCC3qEMGm-xa6-oSkiuwyYwkeLOdzWz5m_AisBbfp5dpAMC1m68Ot3H_Y&_nc_ht=scontent.fkhi10-1.fna&oh=80e8f1e1c42541e7c9f4e904ecf7d6c3&oe=5DB0E833'
]

class PostDescription extends Component{
  constructor(props){
    super(props)

    this.state = {
      activeIndex : 0
    }
  
  }

  segmentClicked = (index)=>{
    this.setState({
      activeIndex : index
    })
  }

  renderSectionOne = () => {
    return images.map((image, index) =>{
      return (
        <View key={index} style={[ { width : (width) / 3 }, {height : (width) /3 },
          { marginBottom : 2 }, 
          index % 3 !== 0 ? { paddingLeft : 2} : { paddingLeft : 0}
        ]}>

          <Image style={{ flex : 1 }}
            source={{ uri : image}}
          />

        </View>
      )
    })
  }

  renderSection = () =>{
      if(this.state.activeIndex == 0){
        return (
          <View style={{ flexDirection : 'row', flexWrap : 'wrap'}}>
              {this.renderSectionOne()}
          </View>

        )
      }

      if(this.state.activeIndex == 1){
        return (
          <View>
             
             <Text>This is the Second selection</Text>

          </View>

        )
      }

      if(this.state.activeIndex == 2){
        return (
          <View>
             
             <Text>This is the Third selection</Text>

          </View>

        )
      }

      if(this.state.activeIndex == 3){
        return (
          <View>
             
             <Text>This is the Third selection</Text>

          </View>

        )
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