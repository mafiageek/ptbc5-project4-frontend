import {
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Text, Card, Button, TextInput, Avatar } from "react-native-paper";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ListingDetailsScreen = ({ route }) => {
  const { photo, title, price, description, latitude, longitude } =
    route.params;

  const [text, setText] = React.useState("");

  return (
    <HideKeyboard>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <TextInput
            style={{ marginTop: 20, height: 80 }}
            multiline
            mode="outlined"
            label="Message"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Button mode="contained" style={{ marginTop: 20 }}>
            CONTACT SELLER
          </Button>
        </View>
        <Card style={{ padding: 15 }}>
          <Card.Cover
            source={{
              uri: `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=${latitude}&lng=${longitude}&zoom=16&height=256&width=384`,
            }}
          />
        </Card>
      </SafeAreaView>
    </HideKeyboard>
  );
};

export default ListingDetailsScreen;