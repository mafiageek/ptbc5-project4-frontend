import { ScrollView, View } from "react-native";
import { Button, Appbar } from "react-native-paper";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@env";

const Header = () => {
  const [categories, setCategories] = useState([]);

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
            key={item._id}
            mode="outlined"
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
