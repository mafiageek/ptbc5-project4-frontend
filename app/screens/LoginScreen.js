import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Text } from "react-native-paper";
import { useAuth } from "../context/auth";
import axios from "axios";
import { BASE_URL } from "@env";
import AppNavigator from "../navigation/AppNavigator";

const LoginScreen = ({ navigation }) => {
  const [auth, setAuth] = useAuth();
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const handleLogin = async () => {
    const { data } = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password,
    });
    setAuth(data);
    // console.log("data =>", data);
    console.log("auth =>", auth);
    console.log(auth.email);

    navigation.navigate("Default");
  };

  const handleRegister = () => {};

  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        margin: 20,
      }}
    >
      <TextInput
        label="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        mode="outlined"
        style={{ marginTop: 100 }}
        left={<TextInput.Icon icon="email-outline" />}
        autoCapitalize="none"
      />
      <TextInput
        secureTextEntry
        label="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        mode="outlined"
        style={{ marginTop: 5 }}
        left={<TextInput.Icon icon="security" />}
      />
      <Button
        mode="contained"
        style={{ marginTop: 20, padding: 5 }}
        onPress={handleLogin}
      >
        LOGIN
      </Button>
      <Button
        mode="contained"
        style={{ marginTop: 20, padding: 5 }}
        onPress={handleRegister}
      >
        REGISTER
      </Button>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
