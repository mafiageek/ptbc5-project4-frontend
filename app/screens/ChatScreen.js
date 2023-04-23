import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Card, TextInput, IconButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@env";
import { useAuth } from "../context/auth";

const ChatScreen = ({ route }) => {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const { fromuserid, touserid } = route.params;
  const [auth, setAuth] = useAuth();

  const from = fromuserid.toString();
  const to = touserid.toString();

  const [refreshing, setRefreshing] = useState(false);

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/message`, {
        fromuserid: to,
        touserid: from,
        content: message,
      });
      setMessage("");
      // console.log("test =>", data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMessages = async () => {
    try {
      const arr1 = await axios.get(
        `${BASE_URL}/messages?fromuserid=${from}&touserid=${to}`
      );

      const arr2 = await axios.get(
        `${BASE_URL}/messages?fromuserid=${to}&touserid=${from}`
      );

      const data = arr1.data.concat(arr2.data);

      console.log("message =>", data);
      setConversation(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("auth =>", auth);

  useEffect(() => {
    loadMessages();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Text variant="titleLarge">Date: {item.updatedAt}</Text>
        <Text variant="titleLarge">
          from:{" "}
          {item.fromuserid.name === auth.name ? "myself" : item.fromuserid.name}
        </Text>
        <Text variant="titleLarge">
          to: {item.touserid.name === auth.name ? "myself" : item.touserid.name}
        </Text>
        <Text variant="bodyMedium">message: {item.content}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={{ marginTop: 30 }}>
      <FlatList
        data={conversation}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadMessages} />
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={{ flex: 1, marginRight: 8 }}
          label="Type a message"
          value={message}
          mode="outlined"
          onChangeText={setMessage}
        />
        <IconButton icon="send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
  },
});
