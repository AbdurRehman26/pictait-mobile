import React, {Component} from 'react';
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import { Content, Container, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Timeline, Follower } from '../screens/event';
import {Slider} from '../common'

import config from '../../config/index'

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

class EventMain extends Component{
  constructor(props){
    super(props)
    
    this.state = {
      screenWidth : Dimensions.get('window').width / 4,
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
    
    renderSection = (eventData) =>{
      if(this.state.activeIndex == 0){
        return (
          <Slider eventData={eventData} />
          )
        }
        
        if(this.state.activeIndex == 1){
          return (
            <Follower eventData={eventData} />
            )
          }
          
        }
        
        
        render(){
          
          const { navigation } = this.props;
          const eventData = navigation.getParam('item');
          
          const imageHeight = this.state.screenWidth
          const imageUri = eventData.displayImage
          
          AsyncStorage.setItem('eventData', JSON.stringify(eventData));
          
          return (
            
            <View style={styles.container}>
            <Container style={{backgroundColor : 'white' , marginTop : 20}}>
            <Content>
            
            <View style={styles.userBar}>
            
            <TouchableOpacity
            style={{flexDirection : 'row'}}
            activeOpacity={1}
            >
            
            <View style={{justifyContent : 'flex-start'}}>
            <Text style={{fontWeight: 'bold'}}>{eventData.name}</Text>
            <Text style={{fontWeight: 'bold'}}>Created: {eventData.formatted_created_at}</Text>
            </View>
            
            </TouchableOpacity>
            
            </View>
            
            
            <View style={{ flex : 1, flexDirection : 'row'}}>
            <TouchableOpacity
            activeOpacity={1}
            >
            <Image 
            style={[styles.image , {width : imageHeight,height: imageHeight * 1.1}]}
            source={{uri : imageUri}} />
            </TouchableOpacity>
            
            <Text style={{ padding : 10}} >{eventData.description}</Text>
            </View>
            
            
            <View style={styles.bottomBar}>
            
            <Text style={[styles.icon, { width : config.styleConstants.defaultRowWidth }]}>{eventData.followers} Followers</Text>
            <Text style={[styles.icon, { width : config.styleConstants.defaultRowWidth }]}>{eventData.number_of_images} Images</Text>
            <Text style={[styles.icon, { width : config.styleConstants.defaultRowWidth }]}>{eventData.privacy_type}</Text>
            <Text style={[styles.icon, { width : config.styleConstants.defaultRowWidth }]}>{eventData.status} </Text>
            
            </View>
            
            
            
            
            
            <View>
            <View style={{ flexDirection : 'row', justifyContent : 'space-around', borderTopWidth : 1, borderTopColor : '#eae5e5'}}>
            
            <Button transparent
            onPress={()=> this.segmentClicked(0)}
            active={this.state.activeIndex == 0}>
            <Icon name="image"
            style={[this.state.activeIndex == 0 ? {} : {color : 'grey'}]}
            />
            </Button>
            
            <Button transparent
            onPress={()=> this.segmentClicked(1)}
            active={this.state.activeIndex == 1}>
            <Icon name="user-plus"
            style={[this.state.activeIndex == 1 ? {} : {color : 'grey'}]}
            />
            </Button>
            
            </View>
            </View>
            
            {this.renderSection(eventData)}
            
            </Content>
            </Container>
            </View>
            
            );
          }
        }
        
        const styles = StyleSheet.create({
          userPic : {
            height : 50,
            width : 50,
            borderRadius : 20,
            marginBottom : 10,
          },  
          userBar : {
            flexDirection : 'row',
            width : 100 + '%',
            height : 50,
            backgroundColor : '#fff',
            paddingHorizontal : 20,
            justifyContent  : 'space-between'
          },
          
          container: {
            borderBottomWidth : StyleSheet.hairlineWidth,
            borderTopWidth : StyleSheet.hairlineWidth,
            flex: 1,
            width: 100 + '%'
          },
          iconBar : {
            height : config.styleConstants.defaultRowHeight+10,
            borderColor : "rgb(233,233,233)",
            borderBottomWidth : StyleSheet.hairlineWidth,
            borderTopWidth : StyleSheet.hairlineWidth,
            flexDirection : 'row',
            justifyContent  : 'space-between',
            
          },
          icon : {
            height : config.styleConstants.defaultRowHeight-10,
            width : config.styleConstants.defaultRowWidth-10,
            marginRight : 10,
            marginLeft : 10,
            marginTop : 10,
          },
          bottomBar:{
            marginLeft : 10,
            paddingBottom : 10,
            height : config.styleConstants.defaultRowHeight + 5,
            borderColor : "rgb(233,233,233)",
            borderBottomWidth : StyleSheet.hairlineWidth,
            flexDirection : 'row',
            justifyContent : 'space-between'
          },
          image : {
            borderRadius : 20,
            marginLeft : 20,
            marginTop : 10,
          }
          
        });
        
        
        export default EventMain;