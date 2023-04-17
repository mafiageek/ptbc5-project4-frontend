import { View, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Button, TextInput, Text } from "react-native-paper";
import axios from "axios";
import { BASE_URL } from "@env";
import { useAuth } from "../context/auth";

const LoginScreen = ({ navigation }) => {
  const [auth, setAuth] = useAuth();

  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const handleLogin = async () => {
    const { data } = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password,
    });
    console.log("data =>", data);
    setAuth(data);
    // console.log("data =>", data);
    console.log("auth =>", auth);
    console.log(auth.email);
    navigation.navigate("App");
  };

  const handleRegister = () => {};

  return (
    <ImageBackground
      source={require("../assets/welcome.jpg")}
      style={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <View style={{ margin: 20, marginBottom: 60 }}>
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          mode="outlined"
          style={{ padding: 5 }}
          left={<TextInput.Icon icon="email-outline" />}
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          mode="outlined"
          style={{ padding: 5, marginTop: 10 }}
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
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
