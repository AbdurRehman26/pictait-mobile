import React, {Component} from 'react';
import { Text, TouchableOpacity} from 'react-native';
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');

class Login extends Component{
  login(){
    this.props.navigation.navigate("main");
  }

  render(){
    var _this = this;
    return (
    <TouchableOpacity
    onPress={()=>{
      this.login()
    }}
    style={{
      height : 100 + '%',
      width : 100 + '%',
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center'
    }}
    >

<FBLogin style={{ 
      height : 20 + '%',
      marginBottom: 10, }}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["email","picture"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          console.log("Logged in!");
          alert(data);
          _this.setState({ user : data.credentials });
        }}
        onLogout={function(){
          console.log("Logged out.");
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          console.log("Existing login found.");
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLoginNotFound={function(){
          console.log("No user logged in.");
          _this.setState({ user : null });
        }}
      />

    </TouchableOpacity>
  );
}
}

export default Login;