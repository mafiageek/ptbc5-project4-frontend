import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "../screens/AddScreen";
import FeedScreen from "../screens/FeedScreen";

const Stack = createStackNavigator();

const AddNavigator = () => (
  <Stack.Navigator initialRouteName="Add">
    <Stack.Screen name="Add" component={AddScreen} />
    <Stack.Screen name="Feed" component={FeedScreen} />
  </Stack.Navigator>
);

export default AddNavigator;
