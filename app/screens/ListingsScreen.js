import { FlatList, RefreshControl, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as Notifications from "expo-notifications";
import Header from "../components/Header";
import Listings from "../components/Listings";
import { BASE_URL } from "@env";
import { useAuth } from "../context/auth";

const ListingsScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [auth, setAuth] = useAuth();

  const loadListings = async (catId) => {
    try {
      console.log(`${BASE_URL}`);
      if (!catId) {
        const { data } = await axios.get(`${BASE_URL}/listings`);
        setListings(data);
      } else {
        const { data } = await axios.get(
          `${BASE_URL}/listings?category=${catId}`
        );
        setListings(data);
      }

      setRefreshing(false);
      // setListings(data);
    } catch (err) {
      console.log(err);
    }
  };

  async function configurePushNotifications() {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;

    if (finalStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    Notifications.getExpoPushTokenAsync({
      projectId: "510f515f-d157-4c62-95d5-015caaaa1993",
    })
      .then(({ data }) => {
        axios.patch(`${BASE_URL}/user/${auth.uid}`, {
          pushtoken: data,
        });
      })
      .catch((err) => console.log(error));
  }

  useEffect(() => {
    configurePushNotifications();
  }, []);

  useEffect(() => {
    loadListings();
    console.log(Listings);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <Header
        listings={listings}
        setListings={setListings}
        loadListings={loadListings}
      />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing._id.toString()}
        renderItem={({ item }) => (
          <Listings key={item.key} item={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadListings} />
        }
      />
    </SafeAreaView>
  );
};

export default ListingsScreen;
