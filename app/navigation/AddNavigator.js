import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "../screens/AddScreen";

const Stack = createStackNavigator();

const AddNavigator = () => (
  <Stack.Navigator initialRouteName="Add">
    <Stack.Screen name="New" component={AddScreen} />
  </Stack.Navigator>
);

export default AddNavigator;