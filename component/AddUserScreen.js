import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { ThemeProvider, Button, Input, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import LOGO from "../img/logo.jpg";
import { useState, useEffect } from "react";
import { url } from "./constant";

import { useNavigation } from "@react-navigation/native";
function AddUserScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState("");

  async function adduser() {
    await axios.post(url + "/insertusers", {
      username: username,
      password: password,
      rooms: room,
    });
    await navigation.pop();
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
          inputStyle={{ color: "#FFF" }}
          placeholder=" Username"
          value={username}
          onChangeText={(val) => {
            setUsername(val);
          }}
        />
        <Input
          leftIcon={<Icon name="key" size={20} color="#FCBD73" />}
          inputStyle={{ color: "#FFF" }}
          placeholder=" Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(val) => {
            setPassword(val);
          }}
        />
        <Input
          leftIcon={<Icon name="home" size={20} color="#FCBD73" />}
          inputStyle={{ color: "#FFF" }}
          placeholder=" Room"
          value={room}
          onChangeText={(val) => {
            setRoom(val);
          }}
        />
        <Button
          title="Add User"
          buttonStyle={{ backgroundColor: "#AF5F00" }}
          onPress={adduser}
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
export default AddUserScreen;
