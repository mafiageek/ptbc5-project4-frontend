import * as React from "react";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import { AuthProvider } from "./app/context/auth";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
