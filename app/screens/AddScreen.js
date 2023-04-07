import {
  Alert,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { BASE_URL } from "@env";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import ImgToBase64 from "react-native-image-base64";

const AddScreen = () => {
  const [image, setImage] = useState(null);
  const [selected, setSelected] = React.useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
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
      console.log(newArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
    console.log(categories);
  }, []);

  const handleSubmit = async () => {
    console.log(image);
    const base64 = await ImgToBase64.getBase64String(image);

    const bodyFormData = new FormData();
    bodyFormData.append("title", title);
    bodyFormData.append("price", price);
    bodyFormData.append("description", description);
    bodyFormData.append("category", selected);
    bodyFormData.append("photo", base64);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI0NDVhOTI5YTBiZWJhZjU3YTRkYjIiLCJpYXQiOjE2ODA4NzQ0MzUsImV4cCI6MTY4MTQ3OTIzNX0.eBshiqJp4zgKehJvmyPBMe2EwigjyKyZj1bfqUUnzgA";
    console.log(bodyFormData);

    // const response = await axios.post(
    //   `${BASE_URL}/listing`,
    //   {
    //     bodyFormData,
    //   },

    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );

    // console.log(response);

    axios({
      method: "post",
      url: `${BASE_URL}/listing`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView
        style={{
          margin: 20,
        }}
      >
        <Text variant="titleLarge">New Listing</Text>
        <View style={{ padding: 20 }}>
          {!image && <MaterialCommunityIcons name="camera" size={40} />}
        </View>
        <View style={{ padding: 20 }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          )}
        </View>
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
          style={{ marginTop: 20 }}
          mode="contained"
          onPress={handleSubmit}
        >
          POST
        </Button>
        <Button>Cancel</Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddScreen;
