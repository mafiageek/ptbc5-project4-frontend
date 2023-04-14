import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "../screens/AddScreen";

const Stack = createStackNavigator();

const AddNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="New" component={AddScreen} />
  </Stack.Navigator>
);

export default AddNavigator;
