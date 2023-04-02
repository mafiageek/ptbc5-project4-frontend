import * as React from "react";
import { Provider as PaperProvider, Text } from "react-native-paper";
import Header from "./app/components/Header";

export default function App() {
  return (
    <PaperProvider>
      <Header />
    </PaperProvider>
  );
}
