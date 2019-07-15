import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from '../../config/index'

class Post extends Component{
    
    lastTap = null;
  handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      this.likeToggled();
    } else {
      this.lastTap = now;
    }
  }
    
    
    constructor(){
        super();
        this.state = {
            liked : false,
            screenWidth : Dimensions.get('window').width
        }
    }
    likeToggled(){
        this.setState({
            liked : !this.state.liked
        })    
    }
  
render(){
    const imageHeight = this.state.screenWidth
    const imageUri = 'https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-9/38669435_883158928550525_3026722204348841984_n.jpg?_nc_cat=107&_nc_oc=AQkbNIQZsOVqjCUtZ1mw2fBAXmXT8mV0OmVtonzhbzM9FxBOBvrMFvjy6p0e6SCtVs0&_nc_ht=scontent.fkhi6-1.fna&oh=e7ae7f711a40828242498156596230fb&oe=5DB0E833'
    const heartLikedColor = this.state.liked ? 'rgb(252,61,57)' : null

    return (
    <View style={styles.container}>
    
        <View style={styles.userBar}>

        <View style={{flexDirection : 'row', alignItems : 'center'}}>
            <Image 
            style={styles.userPic}
            source={{uri : imageUri}} />
            <Text style={{marginLeft : 10}}>Kazmi</Text>
        </View>

        <View style={{alignItems : 'center'}}>
            <Text style={{fontSize : 38}}>...</Text>
        </View>

        </View>
      
        <TouchableOpacity

        onPress={()=>{
            this.handleDoubleTap()
        }}
        >
        <Image 
        style={{width : imageHeight , height: imageHeight * 1.1 }}
        source={{uri : imageUri}} />
        </TouchableOpacity>
        
        <View style={styles.iconBar}>

        <TouchableOpacity
        onPress={()=>{
            this.handleDoubleTap()
        }}
        >
        <Image 
        style={[styles.icon, {tintColor : heartLikedColor}]}
        source={config.image.likeIcon} />
        </TouchableOpacity> 


        <Image 
        style={styles.icon}
        source={config.image.chatIcon} />

        </View>

        <View style={styles.commentsBar}>

        <Image 
        style={[ styles.icon, {height : 30, width : 30}]}
        source={config.image.likeIcon} />
        
        <Text
        style={[ styles.icon, {height : 30, width : 100 + '%'}]}
        >126 Likes</Text>
        </View>



    </View>
  );
}
}

const styles = StyleSheet.create({
    userPic : {
        height : 50,
        width : 50,
        borderRadius : 20,
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
    flex: 1,
    width: 100 + '%'
    },
  navBar : {
    width: 100 + '%',
    height: 75,
    marginTop : 20,
    backgroundColor: '#d3d3d3',
    borderBottomColor : 'white',
    borderBottomWidth : StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems : 'center',

},
iconBar : {
        height : config.styleConstants.defaultRowHeight+10,
        borderColor : "rgb(233,233,233)",
        borderBottomWidth : StyleSheet.hairlineWidth,
        borderTopWidth : StyleSheet.hairlineWidth,
        flexDirection : 'row'

    },
    icon : {
        height : config.styleConstants.defaultRowHeight-10,
        width : config.styleConstants.defaultRowWidth-10,
        marginLeft : 10,
        marginTop : 10,
    },
    commentsBar:{
        height : config.styleConstants.defaultRowHeight,
        borderColor : "rgb(233,233,233)",
        borderBottomWidth : StyleSheet.hairlineWidth,
        borderTopWidth : StyleSheet.hairlineWidth,
        flexDirection : 'row',
    }



});

export default Post;