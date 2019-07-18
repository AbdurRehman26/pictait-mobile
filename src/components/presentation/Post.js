import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from '../../config/index'
import { withNavigation } from 'react-navigation'

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
        const imageUri = this.props.item.post.file_path
        const userImage = this.props.item.user.image
        const heartLikedColor = this.state.liked ? 'rgb(252,61,57)' : null
        const displayName = this.props.item.user.first_name ? this.props.item.user.first_name : '' + ' ' + this.props.item.user.last_name ? this.props.item.user.last_name : ''
        const post = this.props.item.post
        
        return (
            <View style={styles.container}>
            
            <View style={styles.userBar}>
            
            <TouchableOpacity
            style={{flexDirection : 'row'}}
            activeOpacity={1}
            onPress={()=>{
                this.navigateToProfile(this.props.item.user)
            }}
            >
            
            <Image 
            style={styles.userPic}
            source={{uri : userImage}} />
            
            <View style={{justifyContent : 'flex-start'}}>
            <Text style={{fontWeight: 'bold', marginLeft : 10}}>{displayName}</Text>
            <Text style={{marginLeft : 10}}>Added: {post.formatted_created_at}</Text>
            </View>

            </TouchableOpacity>
            
            <View>
            <Text style={{fontSize : 38}}>...</Text>
            </View>
            
            </View>

            <View style={{ padding : 10, marginLeft : 10, alignContent : 'space-around' , alignItems : 'flex-start'}}>
            <Text>{post.caption}</Text>
            </View>


            <TouchableOpacity
            activeOpacity={1}
            onPress={()=>{
                this.props.navigation.navigate('postDescription', {item : this.props.item})
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
            
            
            <TouchableOpacity
            onPress={()=>{
                this.props.navigation.navigate('postDescription', {item : this.props.item})
            }}
            >
            <Image 
            style={styles.icon}
            source={config.image.chatIcon} />
            </TouchableOpacity>

            </View>
            
            <View style={styles.commentsBar}>
                        
            <Text style={[styles.icon, { width : config.styleConstants.defaultRowWidth+35 }]}>{post.likeCount} Likes</Text>
                        
            <Text style={[styles.icon, { width : config.styleConstants.defaultRowWidth+35 }]}>{post.commentsCount} comments</Text>
            
            
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
            marginBottom : 10,
        },  
        userBar : {
            paddingTop : 10,
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
        commentsBar:{
            paddingBottom : 10,
            height : config.styleConstants.defaultRowHeight + 5,
            borderColor : "rgb(233,233,233)",
            borderBottomWidth : StyleSheet.hairlineWidth,
            flexDirection : 'row',
            justifyContent : 'space-between'
        }
        
        
        
    });
    
    export default withNavigation(Post);