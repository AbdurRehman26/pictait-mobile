import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from '../../config/index'
import { withNavigation } from 'react-navigation'

class DarePost extends Component{
    
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
            screenWidth : (Dimensions.get('window').width / 2 ) - 1
        }

    }
    likeToggled(){
        this.setState({
            liked : !this.state.liked
        })    
    }

    navigateToProfile(user){
        this.props.navigation.navigate('profile' , {user : user})
    }
    
    
    render(){
        const imageHeight = this.state.screenWidth
        const imageUri = this.props.userImage ? this.props.userImage : ''
        const userImage = this.props.user ? this.props.user.file_path : ''
        const heartLikedColor = this.state.liked ? 'rgb(252,61,57)' : null
        const displayName = this.props.user.first_name ? this.props.user.first_name : '' + ' ' + this.props.user.last_name ? this.props.user.last_name : ''
        const post = this.props.item.post
        console.log(this.props.user);
        return (
            <View style={styles.container}>
            
            <View style={styles.userBar}>
            
            <TouchableOpacity
            style={{flexDirection : 'row'}}
            activeOpacity={1}
            onPress={()=>{
                this.navigateToProfile(this.props.user)
            }}
            >
            
            <Image 
            style={styles.userPic}
            source={{uri : userImage}} />
            
            <View style={{justifyContent : 'flex-start'}}>
            <Text style={{fontWeight: 'bold', marginLeft : 10}}>{displayName}</Text>
            </View>

            </TouchableOpacity>
                    
            </View>

            <TouchableOpacity
            activeOpacity={1}
            >
            <Image 
            style={[styles.image, {width : imageHeight, height: imageHeight * 1.1}]}
            source={{uri : imageUri}} />
            </TouchableOpacity>
            
            <View style={[styles.iconBar , {flex : 1 , flexDirection : 'row'}]}>
            
            <TouchableOpacity
            onPress={()=>{
                this.handleDoubleTap()
            }}
            >
            <Image 
            style={[styles.icon, {tintColor : heartLikedColor}]}
            source={config.image.likeIcon} />
            </TouchableOpacity> 
            <Text style={[styles.icon, { width : config.styleConstants.defaultRowWidth+35 }]}>{post ? post.likeCount : 0} Likes</Text>

            </View>
            
            </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        userPic : {
            height : 35,
            width : 35,
            borderRadius : 20,
        },  
        userBar : {
            paddingHorizontal : 10,
            paddingVertical : 5,
            flexDirection : 'row',
            width : 100 + '%',
            height : 40,
            backgroundColor : '#fff',
            justifyContent  : 'space-between'
        },
        
        container: {
            borderBottomWidth : StyleSheet.hairlineWidth,
            borderTopWidth : StyleSheet.hairlineWidth,
            borderLeftWidth : StyleSheet.hairlineWidth,
            borderRightWidth : StyleSheet.hairlineWidth,
            flex: 1,
            width: 100 + '%',
            marginTop : 10,
        },
        iconBar : {
            height : config.styleConstants.defaultRowHeight+1,
            borderColor : "rgb(233,233,233)",
            flexDirection : 'row'            
        },
        icon : {
            height : config.styleConstants.defaultRowHeight-20,
            width : config.styleConstants.defaultRowWidth-20,
            marginTop : 10,
            marginLeft : 5,
        },
        commentsBar:{
            paddingBottom : 10,
            height : config.styleConstants.defaultRowHeight + 5,
            borderColor : "rgb(233,233,233)",
            flexDirection : 'row',
            justifyContent : 'space-between'
        },
        image : {
            borderWidth : 10
        }
        
        
    });
    
    export default withNavigation(DarePost);