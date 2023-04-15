import React, { useState } from "react";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./app/context/auth";
import MainNavigator from "./app/navigation/MainNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <PaperProvider>
          <MainNavigator />
        </PaperProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
