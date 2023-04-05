import * as React from "react";
import { Provider as PaperProvider, Text } from "react-native-paper";
import MainContainer from "./app/MainContainer";

export default function App() {
  return (
    <PaperProvider>
      <MainContainer />
    </PaperProvider>
  );
}
