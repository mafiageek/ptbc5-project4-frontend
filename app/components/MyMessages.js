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

const MyMessages = ({ navigation }) => {
  const [messages, setMessages] = useState("");
  const [auth, setAuth] = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const loadMessages = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/messages?touserid=${auth.uid}`
      );

      // const messages = data;

      // // Create an object to store the latest message for each fromuserid
      // const latestMessages = {};

      // // Loop through each message in the messages array
      // messages.forEach((message) => {
      //   // Get the fromuserid of the current message
      //   const fromuserid = message.fromuserid;

      //   // Check if there is already a latest message for this fromuserid
      //   if (
      //     !latestMessages[fromuserid._id] ||
      //     new Date(message.createdAt) >
      //       new Date(latestMessages[fromuserid._id].createdAt)
      //   ) {
      //     // If there is no latest message or the current message is newer than the latest message, update the latest message
      //     latestMessages[fromuserid._id] = message;
      //   }
      // });

      // // Get the name, userid, and content of the latest message from each fromuserid
      // const latestContentByName = Object.keys(latestMessages).reduce(
      //   (result, fromuseridId) => {
      //     const latestMessage = latestMessages[fromuseridId];
      //     result.push({
      //       name: latestMessage.fromuserid.name,
      //       fromuserid: latestMessage.fromuserid._id,
      //       touserid: latestMessage.touserid._id,
      //       content: latestMessage.content,
      //       _id: latestMessage._id,
      //     });
      //     return result;
      //   },
      // );

      // console.log(latestContentByName);

      console.log("messages =>", data);

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
      <List.Item
        title={item.fromuserid.name}
        description={item.content}
        onPress={() =>
          navigation.navigate("Chat", {
            fromuserid: item.fromuserid._id,
            touserid: item.touserid._id,
          })
        }
      />
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
