import * as React from "react";
import { Provider as PaperProvider, Text } from "react-native-paper";
import MainContainer from "./app/MainContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "./app/screens/FeedScreen";

const StackNavigator = () => {
  <Stack.Navigator>
    <Stack.Screen name="Feed" component={FeedScreen} />
  </Stack.Navigator>;
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainContainer />
      </NavigationContainer>
    </PaperProvider>
  );
}
