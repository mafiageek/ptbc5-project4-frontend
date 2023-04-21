import {
  Alert,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  MD2Colors,
  ActivityIndicator,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { BASE_URL } from "@env";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import { useAuth } from "../context/auth";

const PostScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [selected, setSelected] = React.useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [latitude, setlatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [activity, setActivity] = useState(false);
  const [auth, setAuth] = useAuth();

  const handlePress = () => {
    if (!image) pickImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => setImage(null) },
        { text: "No" },
      ]);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result?.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories`);
      let newArray = data.map((item) => {
        return { key: item._id, value: item.name };
      });
      setCategories(newArray);
      // console.log("newArray => ", newArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("auth =>", auth?.token);
    loadCategories();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync({});
      setlatitude(latitude);
      setLongitude(longitude);
      console.log("lat =>", latitude);
      console.log("lon =>", longitude);
    })();
  }, []);

  const handleSubmit = async () => {
    setActivity(true);
    const base64Encode = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const base64Photo = `data:image/jpeg;base64,${base64Encode}`;

    const bodyFormData = new FormData();
    bodyFormData.append("title", title);
    bodyFormData.append("price", price);
    bodyFormData.append("description", description);
    bodyFormData.append("category", selected);
    bodyFormData.append("photo", base64Photo);
    bodyFormData.append("latitude", latitude);
    bodyFormData.append("longitude", longitude);
    const token = auth.token;
    console.log("token =>", auth.token);

    axios({
      method: "post",
      url: `${BASE_URL}/listing`,
      data: bodyFormData,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setActivity(false);
        handleCancel();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setImage(null);
    setSelected(null);
    setTitle(null);
    setDescription(null);
    setPrice(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView
        style={{
          margin: 20,
        }}
      >
        {/* <Text variant="titleLarge">New Listing</Text> */}
        <View style={{ padding: 20 }}>
          {!image && <MaterialCommunityIcons name="camera" size={40} />}
        </View>
        <View style={{ padding: 20 }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 150 }}
            />
          )}
        </View>
        <ActivityIndicator animating={activity} size="large" />
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            mode="outlined"
            label="Title"
            left={<TextInput.Icon icon="pencil-outline" />}
            onChangeText={(text) => setTitle(text)}
            value={title}
          ></TextInput>
          <TextInput
            mode="outlined"
            label="Price"
            left={<TextInput.Icon icon="diamond-outline" />}
            onChangeText={(text) => setPrice(text)}
            value={price}
          ></TextInput>
          <TextInput
            mode="outlined"
            label="Description"
            style={{ marginBottom: 6 }}
            left={<TextInput.Icon icon="calendar-text" />}
            onChangeText={(text) => setDescription(text)}
            value={description}
          ></TextInput>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={categories}
            save="name"
          />

          <Button
            style={{ marginTop: 20, marginBottom: 10, padding: 5 }}
            mode="contained"
            onPress={handleSubmit}
          >
            POST
          </Button>
          <Button onPress={handleCancel}>Cancel</Button>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PostScreen;
