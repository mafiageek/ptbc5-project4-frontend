import { ScrollView, View } from "react-native";
import { Button, Appbar } from "react-native-paper";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@env";

const Header = ({ listings, setListings, loadListings }) => {
  const [categories, setCategories] = useState([]);
  const [mode, setMode] = useState("outlined");
  const loadCategories = async () => {
    try {
      console.log(`${BASE_URL}/categories`);
      const { data } = await axios.get(`${BASE_URL}/categories`);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
    console.log(categories);
  }, []);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item) => (
          <Button
            onPress={() => {
              loadListings(item._id);
            }}
            key={item._id}
            mode="Contained-tonal"
            compact="true"
            style={{ marginHorizontal: 5 }}
          >
            {item.name}
          </Button>
        ))}
      </ScrollView>
    </View>
  );
};

export default Header;
