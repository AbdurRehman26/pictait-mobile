import React, {Component} from 'react';
import { Text, TouchableOpacity} from 'react-native';

class Login extends Component{
  login(){
    this.props.navigation.navigate("main");
  }

  render(){

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
        <Text>Login</Text>
    </TouchableOpacity>
  );
}
}

export default Login;