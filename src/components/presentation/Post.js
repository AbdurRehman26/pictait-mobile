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
    
    constructor(props){
        super(props);
        this.state = {
            liked : false,
            screenWidth : Dimensions.get('window').width
        }
        
        console.log(this.props);
    }
    likeToggled(){
        this.setState({
            liked : !this.state.liked
        })    
    }

    navigateToProfile(){

    }
    
    
    render(){
        const imageHeight = this.state.screenWidth
        const imageUri = this.props.item.post.file_path
        const userImage = this.props.item.user.image
        const heartLikedColor = this.state.liked ? 'rgb(252,61,57)' : null
        const displayName = this.props.item.user.first_name ? this.props.item.user.first_name : '' + ' ' + this.props.item.user.last_name ? this.props.item.user.last_name : ''
        
        console.log(this.props.item);
        
        return (
            <View style={styles.container}>
            
            <View style={styles.userBar}>
            
            
            <TouchableOpacity
            style={{flexDirection : 'row', alignItems : 'center'}}
            activeOpacity={1}
            onPress={()=>{
                this.navigateToProfile()
            }}
            >
            
            <Image 
            style={styles.userPic}
            source={{uri : userImage}} />
            <Text style={{fontWeight: 'bold', marginLeft : 10}}>{displayName}</Text>
            
            </TouchableOpacity>
                        
            <View style={{alignItems : 'center'}}>
            <Text style={{fontSize : 38}}>...</Text>
            </View>
            
            </View>
            
            <TouchableOpacity
            activeOpacity={1}
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