import * as React from "react";
import { Provider as PaperProvider, Text } from "react-native-paper";
import MainContainer from "./app/MainContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "./app/screens/FeedScreen";
import AddScreen from "./app/screens/AddScreen";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainContainer />
      </NavigationContainer>
    </PaperProvider>
  );
}
