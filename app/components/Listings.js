import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";

const Listings = ({ item }) => {
  return (
    <Card style={{ padding: 15 }}>
      {/* <Card.Title title={item.title} subtitle={item.price}/> */}

      <Card.Cover source={{ uri: item.photo }} />
      <Card.Content>
        <Text variant="titleMedium">{item.title}</Text>
        <Text variant="bodyMedium" style={{ color: "teal" }}>
          ${item.price}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default Listings;
