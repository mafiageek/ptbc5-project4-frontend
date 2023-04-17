import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Button,
  TextInput,
  Text,
  List,
  Menu,
  Divider,
} from "react-native-paper";
import { useAuth } from "../context/auth";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "@env";
import axios from "axios";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyMessages from "../components/MyMessages";

const AccountScreen = ({ navigation }) => {
  const [auth, setAuth] = useAuth();
  const [listings, setListings] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  console.log(auth);
  const handleLogout = () => {
    setAuth(null);
    navigation.navigate("Logout");
  };

  const loadListings = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/listings?userid=${auth.uid}`
      );
      console.log(data);
      setListings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/listing/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableWithoutFeedback onPress={() => handleDelete(item._id)}>
          <View
            style={{
              width: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="trash-can" size={30} />
          </View>
        </TouchableWithoutFeedback>
      )}
    >
      <List.Item title={item.title} description={item.description} />
    </Swipeable>
  );

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Divider style={{ marginTop: 20 }} />
      <List.Item
        title={auth?.email}
        left={(props) => <List.Icon {...props} icon="account-box-outline" />}
      />
      <Divider />
      <List.AccordionGroup>
        <List.Accordion
          style={{ marginLeft: 7 }}
          title="My Listings"
          id="1"
          left={(props) => <List.Icon {...props} icon="format-list-bulleted" />}
        >
          <FlatList
            data={listings}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={loadListings}
              />
            }
          />
        </List.Accordion>
      </List.AccordionGroup>
      <Divider />
      <MyMessages />
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
