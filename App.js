// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./src/navigation/MainTab";
import { AuthProvider } from "./src/context/AuthContext"; // Importamos el proveedor

export default function App() {
  return (
    // Envolvemos todo dentro del AuthProvider
    <AuthProvider>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </AuthProvider>
  );
}
