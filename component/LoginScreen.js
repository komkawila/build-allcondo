import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Alert,
} from "react-native";
import { ThemeProvider, Button, Input, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import LOGO from "../img/logo.jpg";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {url} from './constant';


// class LoginScreen extends Component {
//     constructor() {
//         super();
//     }

//     render() {
//         return (
//             <ThemeProvider theme={theme}>
//                 <ScrollView style={style.container}>
//                     <Image
//                         source={LOGO}
//                         style={{ width: 200, height: 200 }}
//                         containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
//                     />
//                     <Input
//                         style={{ marginTop: 30 }}
//                         leftIcon={
//                             <Icon
//                                 style={{ marginTop: 30 }}
//                                 name='user-o'
//                                 size={20}
//                                 color="#FCBD73"
//                             />
//                         }
//                         inputStyle={{color:'#FFF'}}
//                         placeholder=" Username"
//                     />
//                     <Input
//                         leftIcon={
//                             <Icon
//                                 name='key'
//                                 size={20}
//                                 color="#FCBD73"
//                             />
//                         }
//                         inputStyle={{color:'#FFF'}}
//                         placeholder=" Password"
//                     />
//                     <Button
//                         title="LOGIN"
//                         buttonStyle={{ backgroundColor: '#AF5F00' }}
//                     />
//                 </ScrollView>
//             </ThemeProvider>
//         )
//     }
// }

function LoginScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get(url+"/user").then((res) => {
      setUser(res.data);
    });
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function LoginBT() {
    // console.log(username);
    // console.log(password);
    var isCurrent = false;
    var status = 0;
    var user_id = 0;
    var rooms = "";
    user.map((result) => {
      console.log(result);
      if (result.username == username && result.password == password) {
        console.log("!!!!!!!!!!!!!!!!!");
        status = result.status;
        user_id = result.id;
        rooms=result.rooms;
        isCurrent = true;
      }
    });
    if (isCurrent) {
      if (status == 1) {
        navigation.navigate("User", { id: user_id ,rooms: rooms});
      } else {
        navigation.navigate("Admin", { id: user_id});
      }

      setUsername("");
      setPassword("");
    } else {
      Alert.alert("Login Error");
      setUsername("");
      setPassword("");
    }
    console.log("############");
    // .then(
    //     console.log(isCurrent)
    //     // navigation.navigate("Admin");
    // );
    // Alert.alert(
    //     "",
    //     // "My Alert Msg",
    //     // [
    //     //   {
    //     //     text: "Cancel",
    //     //     onPress: () => console.log("Cancel Pressed"),
    //     //     style: "cancel"
    //     //   },
    //     //   { text: "OK", onPress: () => console.log("OK Pressed") }
    //     // ]
    //   );
  }
  return (
    <ThemeProvider theme={theme}>
      <ScrollView style={style.container}>
        <Image
          source={LOGO}
          style={{ width: 200, height: 200 }}
          containerStyle={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <Input
          style={{ marginTop: 30 }}
          leftIcon={
            <Icon
              style={{ marginTop: 30 }}
              name="users"
              size={20}
              color="#FCBD73"
            />
          }
          value={username}
          onChangeText={(val) => {
            setUsername(val);
          }}
          inputStyle={{ color: "#FFF" }}
          placeholder=" Username"
        />
        <Input
          leftIcon={<Icon name="key" size={20} color="#FCBD73" />}
          inputStyle={{ color: "#FFF" }}
          placeholder=" Password"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
          }}
          secureTextEntry={true}
        />
        <Button
          title="LOGIN"
          buttonStyle={{ backgroundColor: "#AF5F00" }}
          onPress={LoginBT}
        />
      </ScrollView>
    </ThemeProvider>
  );
}

const theme = {
  Button: {
    raise: true,
  },
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#2B2727",
  },
  preloader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LoginScreen;
