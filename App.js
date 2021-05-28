import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./component/LoginScreen";
import AddUserScreen from "./component/AddUserScreen";
import AdminScreen from "./component/AdminScreen";
import UserScreen from "./component/UserScreen";
import AddnewsScreen from "./component/AddnewsScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#AF5F00",
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        option={{ title: "Login" }}
      />
      <Stack.Screen
        name="Add User"
        component={AddUserScreen}
        option={{ title: "Add User" }}
      />
      <Stack.Screen
        name="Admin"
        component={AdminScreen}
        option={{ title: "Admin" }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        option={{ title: "User" }}
      />
      <Stack.Screen
        name="AddNews"
        component={AddnewsScreen}
        option={{ title: "Add News" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2727",
    alignItems: "center",
    justifyContent: "center",
  },
});
