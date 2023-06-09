import { FlatList, RefreshControl, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
