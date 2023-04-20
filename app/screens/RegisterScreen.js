import { View, ImageBackground, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { Button, TextInput, Text } from "react-native-paper";
import axios from "axios";
import { BASE_URL } from "@env";
import { useAuth } from "../context/auth";

const RegisterScreen = ({ navigation }) => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const handleRegister = async () => {
    const { data } = await axios.post(`${BASE_URL}/register`, {
      email: email,
      password: password,
      name: name,
    });
    console.log("data =>", data);
    setAuth(data);
    // console.log("data =>", data);
    console.log("auth =>", auth);
    navigation.navigate("App");
  };

  return (
    <ImageBackground
      source={require("../assets/welcome.jpg")}
      style={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <KeyboardAvoidingView behavior="padding">
        <View style={{ margin: 20, marginBottom: 60 }}>
          <TextInput
            label="Name"
            onChangeText={(text) => setName(text)}
            value={name}
            mode="outlined"
            style={{ padding: 5 }}
            left={<TextInput.Icon icon="account-arrow-right-outline" />}
            autoCapitalize="none"
          />
          <TextInput
            label="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            mode="outlined"
            style={{ padding: 5, marginTop: 10 }}
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
            onPress={handleRegister}
          >
            REGISTER
          </Button>
          <Button
            mode="contained"
            style={{ marginTop: 20, padding: 5 }}
            onPress={() => navigation.navigate("Login")}
          >
            CANCEL
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;
