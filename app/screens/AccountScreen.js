import { SafeAreaView } from "react-native";
import { Button, List, Divider } from "react-native-paper";
import { useAuth } from "../context/auth";
import React from "react";
import MyMessages from "../components/MyMessages";
import MyListings from "../components/MyListings";

const AccountScreen = ({ navigation }) => {
  const [auth, setAuth] = useAuth();

  console.log(auth);
  const handleLogout = () => {
    setAuth(null);
    navigation.navigate("Logout");
  };

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Divider style={{ marginTop: 20 }} />
      <List.Item
        title={auth?.name}
        description={auth?.email}
        left={(props) => <List.Icon {...props} icon="account-box-outline" />}
      />
      <Divider />
      <MyListings />
      <Divider />
      <MyMessages navigation={navigation} />
      <Divider />
      <Button
        mode="contained"
        style={{ marginTop: 50, padding: 5 }}
        onPress={handleLogout}
      >
        LOGOUT
      </Button>
    </SafeAreaView>
  );
};

export default AccountScreen;
