import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import React from "react";

const FeedDetailScreen = ({ route }) => {
  const { photo, title, price, description, location } = route.params;
  console.log(route.params);
  const coordsArray = location.split(",");

  return (
    <View>
      test
      {/* <Card style={{ padding: 15, marginBottom: 5 }}>
        <Card.Cover source={{ uri: photo }} />
        <Card.Content>
          <Text variant="titleMedium">{title}</Text>
          <Text variant="bodyMedium" style={{ color: "teal" }}>
            ${price}
          </Text>
          <Text variant="bodySmall">{description}</Text>
        </Card.Content>
      </Card> */}
      {/* {coordsArray[0] && (
        <Card style={{ padding: 15 }}>
          <Card.Cover
            source={{
              uri: `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=${coordsArray[1]}&lng=${coordsArray[0]}&zoom=16&height=256&width=256`,
            }}
          />
        </Card>
      )} */}
    </View>
  );
};

export default FeedDetailScreen;
