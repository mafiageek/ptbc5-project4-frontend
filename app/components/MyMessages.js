import { useAuth } from "../context/auth";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "@env";
import axios from "axios";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  RefreshControl,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { List } from "react-native-paper";

const MyMessages = () => {
  const [messages, setMessages] = useState("");
  const [auth, setAuth] = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const loadMessages = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/messages?touserid=${auth.uid}`
      );
      // console.log("message =>", data);
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/message/${id}`);
      loadMessages();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableWithoutFeedback onPress={() => handleDelete(item._id)}>
          <View
            style={{
              backgroundColor: "rgb(240, 219, 255)",
              width: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="trash-can-outline" size={30} />
          </View>
        </TouchableWithoutFeedback>
      )}
    >
      <List.Item title={item.fromuserid.name} description={item.content} />
    </Swipeable>
  );
  return (
    <List.AccordionGroup>
      <List.Accordion
        style={{ marginLeft: 7 }}
        title="My Messages"
        id="1"
        left={(props) => (
          <List.Icon {...props} icon="message-reply-text-outline" />
        )}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadMessages} />
          }
        />
      </List.Accordion>
    </List.AccordionGroup>
  );
};

export default MyMessages;
