// src/navigation/MainTab.js
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/AuthContext";

import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import ConfigScreen from "../screens/ConfigScreen";
import RequestsScreen from "../screens/RequestsScreen";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator
      // Quitamos el initialRouteName para que tome por defecto la primera de la lista (Eventos)
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#ffffff",
        tabBarStyle: { backgroundColor: "#000000", borderTopColor: "#333333" },
        tabBarActiveTintColor: "#4da6ff",
        tabBarInactiveTintColor: "#888888",
      }}
    >
      {/* 1. EVENTOS SIEMPRE VISIBLE: Lo sacamos de la condición para que todos lo vean */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Eventos" }}
      />

      {!user ? (
        <>
          {/* 2. REGISTRO: Visible en la barra para los invitados */}
          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Registro" }}
          />

          {/* 3. LOGIN OCULTO: Existe en el navegador, pero ocultamos su icono en la barra */}
          {/* 3. LOGIN OCULTO: Sin botón y sin ocupar espacio */}
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Acceso",
              tabBarButton: () => null, // Lo hace invisible
              tabBarItemStyle: { display: "none" }, // ¡Esto elimina el hueco fantasma!
            }}
          />
        </>
      ) : (
        <>
          {/* RUTAS PRIVADAS (Solo cuando inician sesión) */}
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{ title: "Chat" }}
          />

          {user.rol === "ADMIN" && (
            <Tab.Screen
              name="Requests"
              component={RequestsScreen}
              options={{ title: "Admin" }}
            />
          )}

          <Tab.Screen
            name="Config"
            component={ConfigScreen}
            options={{ title: "Perfil" }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
