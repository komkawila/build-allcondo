import React, { Component } from "react";

import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from "react-native";

import {
  ThemeProvider,
  Button,
  Input,
  Image,
  ListItem,
  Avatar,
} from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import UNLOCK from "../img/unlock2.png";
import imglock from "../img/unlock2.png";
import NEWS from "../img/news.png";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { url } from "./constant";


function UserScreen(route) {
  const navigation = useNavigation();
//   const [userid, setUserid] = useState(0);
  const iduser = route.route.params.id;
  const roomuser = route.route.params.rooms;
  console.log("iduser = " + iduser);
  console.log("roomuser = " + roomuser);
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios.get(url + "/news/" + iduser).then((res, key) => {
        console.log(res.data);
        setNews(res.data);
    });
  }, []);
  //   useEffect(() => {
  //     console.log("route = ");
  //     console.log(route.route.params.id);
  //     setUserid(route.route.params.id);
  //   }, []);
  //   useEffect(() => {
  //     console.log("userid = ");
  //     console.log(userid);
  //   }, [userid]);

  function doorUnlock() {
    axios.get(url + "/updatestate/1").then((res) => {
      console.log("res = ");
      console.log(res);
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
    });
  }
  return (
    <ThemeProvider theme={theme}>
      <ScrollView style={style.container}>
        <Image
          source={imglock}
          style={{ width: 200, height: 200 }}
          containerStyle={{ marginLeft: "auto", marginRight: "auto" }}
          tintColor="orange"
          onPress={doorUnlock}
        />
      </ScrollView>
      <View style={style.containerNews}>
        <ScrollView>
          {news.map((result, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={NEWS} />
              <ListItem.Content>
                <ListItem.Title>{result.room}</ListItem.Title>
                <ListItem.Subtitle>{result.news}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </View>
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
    marginBottom: 0,
    backgroundColor: "#2B2727",
    paddingBottom:50,    
  },
  containerNews: {
    flex: 3,
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

export default UserScreen;
