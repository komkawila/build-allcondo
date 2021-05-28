import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import {
  ThemeProvider,
  Button,
  Input,
  Image,
  CheckBox,
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import LOGO from "../img/logo.jpg";
import { useState, useEffect } from "react";
import { url } from "./constant";

import { useNavigation } from "@react-navigation/native";

function AddnewsScreen() {
  const navigation = useNavigation();
  const [news, setNews] = useState("");

  const [groups, setGroups] = useState([]);

  const [roomsapi, setRoomapi] = useState([]);

  useEffect(() => {
    axios.get(url + "/getrooms").then((res) => {
      setRoomapi(res.data);
    });
  }, []);

  useEffect(() => {
    console.log(roomsapi.length);
    const datas = [];
    if (roomsapi.length > 0) {
      roomsapi.map((data) => {
        console.log(data.rooms);
        console.log(groups);
        if (data.rooms == "ADMIN") {
          datas.push({
            room: data.rooms,
            check: true,
          });
        } else {
          datas.push({
            room: data.rooms,
            check: false,
          });
        }
      });
      setGroups(datas);
    }
  }, [roomsapi]);

  async function addnews() {
    console.log("data = ");
    var aaaa = await groups.filter((rr) => {
      return rr.check == true;
    });

    console.log(aaaa[0].room);
    await axios.post(url + "/insertnews", {
      news: news,
      room: aaaa[0].room,
    });
    await navigation.navigate("Admin", { id: 0, state: true });
  }
  const [checked, toggleChecked] = useState(false);

  function onCheckFunc(res) {
    console.log(res.check);
    console.log("res.room =" + res.room);
    setGroups(
      groups.map((val) => {
        return val.room == res.room
          ? {
              room: val.room,
              check: true,
            }
          : {
              room: val.room,
              check: false,
            };
      })
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <ScrollView style={style.container}>
        <Image
          source={LOGO}
          style={{ width: 120, height: 120, marginTop: 0 }}
          containerStyle={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <Input
          style={{ marginTop: 1 }}
          leftIcon={
            <Icon
              style={{ marginTop: 1 }}
              name="pencil"
              size={20}
              color="#FCBD73"
            />
          }
          inputStyle={{ color: "#FFF" }}
          placeholder=" News"
          value={news}
          onChangeText={(val) => {
            setNews(val);
          }}
        />

        <View style={style.containerNews}>
        <ScrollView >{groups.length > 0
            ? groups.map((result) => {
                return (
                  <CheckBox
                    title={result.room}
                    checked={result.check}
                    onPress={() => {
                      onCheckFunc(result);
                    }}
                  />
                );
              })
            : null}</ScrollView>
          
        </View>
      </ScrollView>
      <View style={style.containerNews2}>
        <Button
          title="Add News"
          buttonStyle={{
            backgroundColor: "#086D05",
            marginTop: 5,
            marginBottom: 10,
          }}
          containerStyle={{ marginLeft: "auto", marginRight: "auto" }}
          onPress={addnews}
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
    paddingBottom: 35,
    backgroundColor: "#2B2727",
  },
  containerNews: {
    flex: 2,
    backgroundColor: "#2B2727",
    paddingBottom: 50,
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
  containerStyle: {
    flex: 1,
    marginHorizontal: 1,
    justifyContent: "center",
  },
});

export default AddnewsScreen;
