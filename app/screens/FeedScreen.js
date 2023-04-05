import { FlatList, RefreshControl, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Listings from "../components/Listings";
import { BASE_URL } from "@env";

const FeedScreen = () => {
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadListings = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/listings`);
      setRefreshing(false);
      setListings(data);
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
    <View>
      <Header />

      <FlatList
        data={listings}
        keyExtractor={(listing) => listing._id.toString()}
        renderItem={({ item }) => <Listings key={item.key} item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadListings} />
        }
      />
    </View>
  );
};

export default FeedScreen;
