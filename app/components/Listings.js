import React from "react";
import { Card, Text } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native";

const Listings = ({ item, navigation }) => {
  return (
    <TouchableWithoutFeedback>
      <Card
        style={{ padding: 15 }}
        onPress={() =>
          navigation.navigate("Detail", {
            title: item.title,
            price: item.price,
            description: item.description,
            photo: item.photo,
            location: item.location,
            userid: item.userid,
            longitude: item.longitude,
            latitude: item.latitude,
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
