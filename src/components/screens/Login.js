import React, { Component } from 'react';
import config from '../../config'

var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import AsyncStorage from '@react-native-community/async-storage';


import {
  StyleSheet,
  View,
  Image,
  ImageBackground
} from 'react-native';


class Login extends Component{  
  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }

    var _this = this;
    this.retrieveItem('access_token').then(data=>{
        _this.navigateToMainScreen();       
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

  navigateToMainScreen(){
    this.props.navigation.navigate('main')
  }

  async loginUser(data){

    var _this = this;

    var facebookUserData = _this.state.facebookUserData


    var  postData = JSON.stringify({
      provider_access_token : facebookUserData.credentials.token,
      email : facebookUserData.profile.email,
      first_name : facebookUserData.profile.name,
      provider_id : facebookUserData.profile.id,
      image : facebookUserData.profile.picture.data.url
    })

    fetch(config.systemConfig.baseUrl+'user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: postData,
    }).then((res) => res.json())
            .then((response) =>  {
              _this.setState({
                user : response.data.user,
                token : response.data.token
              })
              
              AsyncStorage.setItem('user', JSON.stringify(response.data.user));
              AsyncStorage.setItem('access_token', JSON.stringify(response.data.token));
              AsyncStorage.setItem('fb_access_token', JSON.stringify(facebookUserData.credentials.token));
              
              _this.navigateToMainScreen()

            })
            .catch((err)=>console.log(err))
  }


  render() {
    var _this = this;
    return (

<ImageBackground
      style={{width: '100%', height: '100%'}}
          source={require('../screens/LoginBackgroundImage.png')}> 
      <View style={styles.container}>

        <Image
      style={styles.loginBannerImage}
      source={require('../screens/login-graphics.png')}

        />


<View style={styles.buttonViewContainer}>

        <FBLogin
        style={styles.buttonContainer}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["email"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){

          _this.setState({ facebookUserData : data });
          _this.loginUser(data);

        }}
        onLogout={function(){
          _this.setState({ facebookUserData : null });
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          _this.navigateToMainScreen()

        }}
        onLoginNotFound={function(){
          _this.setState({ user : null });
        }}
      />
      </View>

      </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex : 1,
    marginTop : 150,
    marginBottom : 150,
    marginLeft : 50,
    marginRight : 50,
    borderRadius : 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC'    
  },

  buttonViewContainer :{
    height : 50,
    marginTop : 50,
    marginBottom : 150,
    marginLeft : 50,
    marginRight : 50,
    borderRadius : 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC'    
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:20,
    marginRight:20,
    height : 20,
    width:200,
    borderRadius:20,
  },
  loginBannerImage : {
    marginTop : 150,
    width:  '75%',
    height: '50%'
  }
});
 
Login.navigationOptions = ({ /*navigation*/ }) => {
  return {
      header: null
  }
}

export default Login;