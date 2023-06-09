import React from "react";
import { Card, Text } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native";

const Listings = ({ item, navigation }) => {
  return (
    <TouchableWithoutFeedback>
      <Card
        style={{ padding: 15 }}
        onPress={() =>
          navigation.navigate("ListingDetails", {
            title: item.title,
            price: item.price,
            description: item.description,
            photo: item.photo,
            location: item.location,
            longitude: item.longitude,
            latitude: item.latitude,
            name: item.userid.name,
            userid: item.userid._id,
            email: item.userid.email,
          })
        }
      >
        <Card.Cover source={{ uri: item.photo }} />
        <Card.Content>
          <Text variant="titleMedium">{item.title}</Text>
          <Text variant="bodyMedium" style={{ color: "teal" }}>
            ${item.price}
          </Text>
          <Text variant="bodySmall">{item.description}</Text>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default Listings;
