import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Alert,
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
import LOGO from "../img/logo.jpg";
import { useState, useEffect } from "react";
import { url } from "./constant";
import NEWS from "../img/news.png";
import { useNavigation } from "@react-navigation/native";

var _init = false;
function AdminScreen(route) {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(0);
  // const [stateFetch, setStateFetch] = useState(false);
  // const state = route.route.params.state;
  // setStateFetch(route.route.params.state);

  console.log("@@@@@@@@@@@ !!!!! OVERLOAD !!!!! @@@@@@@@@@@");
  console.log("route.route.params.state = " + route.route.params.state);

  useEffect(() => {
    axios.get(url + "/news").then((res, key) => {
      // console.log(res.data);
      // setNews(res.data);
      fetchapi();
    });
  }, []);

  function fetchapi() {
    axios.get(url + "/news").then((res, key) => {
      console.log(res.data);
      setNews(res.data);
    });
  }

  function deleteList(id) {
    console.log("key = ");
    console.log(id);
    console.log("!!!!!!!!!!!!!!!!!!!! \n");
    Alert.alert("Delete", "Are you sure to delete this item?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Pressed");
        },
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("OK Pressed");
          axios.delete(url + "/deletenews/" + id).then((res) => {
            if (res.data.affectedRows == 1) {
              // news
              setNews(
                news.filter((val) => {
                  return val.id != id;
                })
              );
            }
            console.log(res.data.affectedRows);
          });
          id;
        },
      },
    ]);
  }

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        style={style.container}
      >
        <Image
          source={LOGO}
          style={{ width: 150, height: 150 }}
          containerStyle={{ marginLeft: "auto", marginRight: "auto",marginBottom:10,marginTop:0 }}
        />

        <Button
          title="Add News"
          buttonStyle={{
            backgroundColor: "#AF5F00",
            marginTop: 0,
            marginBottom: 20,
          }}
          onPress={() => navigation.navigate("AddNews")}
        />
      </ScrollView>

      <View style={style.containerNews}>
        <ScrollView 
        bounces={true}
        horizontal={false}
        onScroll={fetchapi}>
          {news.map((result, i) => (
            <ListItem
              key={result.id}
              bottomDivider
              onPress={(res) => {
                deleteList(result.id);
              }}
            >
              <Avatar source={NEWS} />
              <ListItem.Content>
                <ListItem.Title>{result.room}</ListItem.Title>
                <ListItem.Subtitle>{result.news}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </View>
      <View style={style.containerNews2}>
        <Button
          title="Add User"
          buttonStyle={{
            backgroundColor: "#086D05",
            marginTop: 10,
            marginBottom: 20,
          }}
          containerStyle={{ marginLeft: "auto", marginRight: "auto" }}
          onPress={() => navigation.navigate("Add User")}
        />
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
    backgroundColor: "#2B2727",
  },
  containerNews: {
    flex: 2,
    backgroundColor: "#2B2727",
  },
  containerNews2: {
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

export default AdminScreen;
