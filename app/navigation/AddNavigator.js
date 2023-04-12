import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "../screens/AddScreen";
import LoginScreen from "../screens/LoginScreen";
import { useAuth } from "../context/auth";

const Stack = createStackNavigator();

const AddNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="New" component={AddScreen} />

    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

export default AddNavigator;
