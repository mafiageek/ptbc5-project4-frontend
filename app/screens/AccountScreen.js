import { SafeAreaView, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useAuth } from "../context/auth";
import React from "react";

const AccountScreen = ({ navigation }) => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth(null);
    navigation.navigate("Logout");
  };

  return (
    <SafeAreaView>
      <Button
        mode="contained"
        style={{ marginTop: 20, padding: 5 }}
        onPress={handleLogout}
      >
        LOGOUT
      </Button>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
