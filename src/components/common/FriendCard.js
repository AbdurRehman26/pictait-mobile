import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

class FriendCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }  
        render() {
            const item = this.props.item;
            console.log(item , 12312312);
            return (
                
                <View style={styles.container}>
                <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{uri: item.user.file_path}}/>
                </TouchableOpacity>
                <View style={styles.content}>
                <View style={styles.contentHeader}>
                <Text  style={styles.name}>{item.user.first_name}</Text>
                <Text style={styles.time}>
                {item.formatted_created_at}
                </Text>
                </View>
                <Text rkType='primary3 mediumLine'>{item.comment}</Text>
                </View>
                </View>
            
                );
            }
        }
        
        const styles = StyleSheet.create({
            root: {
                backgroundColor: "#ffffff",
                marginTop:10,
            },
            container: {
                paddingLeft: 19,
                paddingRight: 16,
                paddingVertical: 12,
                flexDirection: 'row',
                alignItems: 'flex-start'
            },
            content: {
                marginLeft: 16,
                flex: 1,
            },
            contentHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 6
            },
            separator: {
                height: 1,
                backgroundColor: "#CCCCCC"
            },
            image:{
                width:45,
                height:45,
                borderRadius:20,
                marginLeft:0
            },
            time:{
                fontSize:11,
                color:"#808080",
            },
            name:{
                fontSize:16,
                fontWeight:"bold",
            },
        });
        
        export default FriendCard;