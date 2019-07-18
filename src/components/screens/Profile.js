import React, {Component} from 'react';
import { Image, Text, View, Dimensions} from 'react-native';
import { Content, Container, Button, Icon} from 'native-base';


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

class Profile extends Component{
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
    const user = navigation.getParam('user');
  
    return (
      <Container style={{ paddingTop: 10, flex : 1 , backgroundColor : 'white'}}>
      <Content>
      <View>
      <View style={{flexDirection : 'row'}}>
      
      <View style={{ flex : 1, alignItems : 'center' }}>
      <Image
      style={{width : 75, height : 75, borderRadius : 37.5}}
      source={{ uri : user.image }}
      />
      </View>
      
      <View style={{ flex : 3 }}>
      
      <View style={{ flexDirection : 'row', justifyContent : 'space-around' }}>
      
      <View style={{ alignItems : 'center' }}>
      <Text>10</Text>
      <Text style={{ fontSize : 15, color: 'gray'}}>Posts</Text>
      </View>
      
      <View style={{ alignItems : 'center' }}>
      <Text>15</Text>
      <Text style={{ fontSize : 15, color: 'gray'}}>Followings</Text>
      </View>
      
      <View style={{ alignItems : 'center' }}>
      <Text>5</Text>
      <Text style={{ fontSize : 15, color: 'gray'}}>Followers</Text>
      </View>
      
      </View>
      
      <View style={{ flexDirection : 'row', paddingTop: 10 }}>
      
      <Button bordered dark
      style={{ flex : 3, marginLeft: 10, justifyContent : 'center', height : 30}}
      >
      <Text>Edit Profile</Text>
      </Button>
      
      <Button bordered dark
      style={{ flex : 1, marginLeft: 5, marginRight : 10, justifyContent : 'center', height : 30}}
      >
      <Icon name="settings"/>
      </Button>
      
      </View>
      
      </View>
      
      </View>

      <View style={{ paddingVertical : 10, paddingHorizontal : 10}}>
        <Text style={{ fontWeight : 'bold'}}>{user.first_name}</Text>
        <Text>Lark | Software Engineer | Poet</Text>
        <Text>http://facebook.com/sark26</Text>
      </View>

      <View>
      <View style={{ flexDirection : 'row', justifyContent : 'space-around', borderTopWidth : 1, borderTopColor : '#eae5e5'}}>

        <Button transparent
          onPress={()=> this.segmentClicked(0)}
          active={this.state.activeIndex == 0}>
            <Icon name="settings"
            style={[this.state.activeIndex == 0 ? {} : {color : 'grey'}]}
            />
        </Button>

        <Button transparent
          onPress={()=> this.segmentClicked(1)}
          active={this.state.activeIndex == 1}>
            <Icon name="settings"
            style={[this.state.activeIndex == 1 ? {} : {color : 'grey'}]}
            />
        </Button>

        <Button transparent
          onPress={()=> this.segmentClicked(2)}
          active={this.state.activeIndex == 2}>
            <Icon name="settings"
            style={[this.state.activeIndex == 2 ? {} : {color : 'grey'}]}
            />
        </Button>

        <Button transparent
          onPress={()=> this.segmentClicked(3)}
          active={this.state.activeIndex == 3}>
            <Icon name="settings"
            style={[this.state.activeIndex == 3 ? {} : {color : 'grey'}]}
            />
        </Button>

      </View>
      </View>

      {this.renderSection()}

      </View>
      </Content>
      </Container>
      );
    }
  }
  
  export default Profile;