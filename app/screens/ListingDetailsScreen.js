import {
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import {
  Text,
  Card,
  Button,
  TextInput,
  Avatar,
  List,
} from "react-native-paper";
import { BASE_URL } from "@env";
import { useAuth } from "../context/auth";
import axios from "axios";
import Toast from "react-native-toast-message";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ListingDetailsScreen = ({ route }) => {
  const [text, setText] = React.useState("");
  const [auth, setAuth] = useAuth();
  const {
    userid,
    photo,
    title,
    price,
    description,
    latitude,
    longitude,
    name,
    email,
  } = route.params;

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/message`, {
        fromuserid: auth.uid,
        touserid: userid,
        content: text,
      });
      setText("");
      showToast();
      // console.log("test =>", data);
    } catch (err) {
      console.log(err);
    }
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Sent",
      visibilityTime: 2000,
    });
  };

  return (
    <HideKeyboard>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <TextInput
            style={{ marginTop: 10, height: 80 }}
            multiline
            mode="outlined"
            label="Message"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Button
            mode="contained"
            style={{ marginTop: 20, padding: 5 }}
            onPress={handleSubmit}
          >
            CONTACT SELLER
          </Button>
        </View>
        <List.Item
          title={name}
          description={email}
          left={(props) => <List.Icon {...props} icon="face-man" />}
        />
        <Card style={{ margin: 20 }}>
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
