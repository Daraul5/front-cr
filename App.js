import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import MainTab from "./src/navigation/MainTab";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <MainTab />
      </NavigationContainer>
    </AuthProvider>
  );
}