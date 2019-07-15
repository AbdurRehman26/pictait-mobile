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

<FBLogin style={{ marginBottom: 10, }}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          console.log("Logged in!");
          console.log(data);
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
        onError={function(data){
          console.log("ERROR");
          console.log(data);
        }}
        onCancel={function(){
          console.log("User cancelled.");
        }}
        onPermissionsMissing={function(data){
          console.log("Check permissions!");
          console.log(data);
        }}
      />

    </TouchableOpacity>
  );
}
}

export default Login;