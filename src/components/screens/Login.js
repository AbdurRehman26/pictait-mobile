import React, { Component } from 'react';
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import {
  StyleSheet,
  View,
  ImageBackground
} from 'react-native';

class Login extends Component{

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
  }
  
  render() {
    var _this = this;
    return (

<ImageBackground
      style={{width: '100%', height: '100%'}}
          source={require('../screens/LoginBackgroundImage.png')}> 
      <View style={styles.container}>
        
        <FBLogin
        style={styles.buttonContainer}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["email"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLogout={function(){
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLoginNotFound={function(){
          _this.setState({ user : null });
        }}
      />
      </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex : 1,
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC'    
  },
  buttonContainer: {
    padding:25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:20,
  }
});
 
export default Login;