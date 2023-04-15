import { SafeAreaView, StyleSheet } from "react-native";
import {
  Button,
  TextInput,
  Text,
  List,
  Menu,
  Divider,
} from "react-native-paper";
import { useAuth } from "../context/auth";
import React from "react";

const AccountScreen = ({ navigation }) => {
  const [auth, setAuth] = useAuth();

  console.log(auth);
  const handleLogout = () => {
    setAuth(null);
    navigation.navigate("LogOut");
  };

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Divider style={{ marginTop: 20 }} />
      <List.Item
        title={auth?.email}
        left={(props) => <List.Icon {...props} icon="account-box-outline" />}
      />
      <Divider />
      <Divider style={{ marginTop: 40 }} />
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
