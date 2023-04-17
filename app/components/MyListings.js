import { useAuth } from "../context/auth";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "@env";
import axios from "axios";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  RefreshControl,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { List } from "react-native-paper";

const MyListings = () => {
  const [auth, setAuth] = useAuth();
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
              backgroundColor: "rgb(240, 219, 255)",
              width: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="trash-can-outline" size={30} />
          </View>
        </TouchableWithoutFeedback>
      )}
    >
      <List.Item title={item.title} description={item.description} />
    </Swipeable>
  );
  return (
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
            <RefreshControl refreshing={refreshing} onRefresh={loadListings} />
          }
        />
      </List.Accordion>
    </List.AccordionGroup>
  );
};

export default MyListings;
