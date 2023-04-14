import React, { useState } from "react";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import { AuthProvider } from "./app/context/auth";
import { useAuth } from "./app/context/auth";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <PaperProvider>
          <AuthNavigator />
        </PaperProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
