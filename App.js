import * as React from "react";
import { Provider as PaperProvider, Text } from "react-native-paper";
import MainContainer from "./app/MainContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "./app/screens/FeedScreen";
import AddScreen from "./app/screens/AddScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  <Stack.Navigator>
    <Stack.Screen name="Feed" component={FeedScreen} />
    <Stack.Screen name="Add" component={AddScreen} />
  </Stack.Navigator>;
};

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StackNavigator />
        <MainContainer />
      </PaperProvider>
    </NavigationContainer>
  );
}
