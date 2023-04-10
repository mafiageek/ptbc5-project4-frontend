import { View } from "react-native";
import React from "react";
import { Text, Card } from "react-native-paper";

const FeedDetailScreen = ({ route }) => {
  const { photo, title, price, description, latitude, longitude } =
    route.params;

  console.log(longitude);
  return (
    <View>
      <Card style={{ padding: 15 }}>
        <Card.Cover
          source={{
            uri: `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=${latitude}&lng=${longitude}&zoom=16&height=256&width=384`,
          }}
        />
      </Card>
    </View>
  );
};

export default FeedDetailScreen;
