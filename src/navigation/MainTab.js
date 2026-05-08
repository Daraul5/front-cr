// src/navigation/MainTab.js
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // <-- 1. Importamos el Stack
import { AuthContext } from "../context/AuthContext";

import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen"; // Esta será nuestra Sala de Chat (ChatRoom)
import ChannelsScreen from "../screens/ChannelsScreen"; // <-- 2. Importamos los Canales
import ConfigScreen from "../screens/ConfigScreen";
import RequestsScreen from "../screens/RequestsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 3. CREAMOS EL STACK EXCLUSIVO PARA EL CHAT
function ChatStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#ffffff",
      }}
    >
      {/* La base de la pila: La lista de Canales */}
      <Stack.Screen 
        name="Channels" 
        component={ChannelsScreen} 
        options={{ headerShown: false }} // Ocultamos el header aquí para no chocar con el del Tab
      />
      {/* La Sala de Chat: Se abre por encima al tocar un canal */}
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatScreen} 
        // Hacemos que el título de la pantalla sea dinámico según el canal que tocaste
        options={({ route }) => ({ 
          title: route.params?.channelName || "Sala de Chat",
          headerBackTitleVisible: false, // Quita el texto "Atrás" en iOS para que se vea más limpio
        })} 
      />
    </Stack.Navigator>
  );
}

export default function MainTab() {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#ffffff",
        tabBarStyle: { backgroundColor: "#000000", borderTopColor: "#333333" },
        tabBarActiveTintColor: "#4da6ff",
        tabBarInactiveTintColor: "#888888",
      }}
    >
      {/* EVENTOS SIEMPRE VISIBLE */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Eventos" }}
      />

      {!user ? (
        <>
          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Registro" }}
          />

          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Acceso",
              tabBarButton: () => null,
              tabBarItemStyle: { display: "none" },
            }}
          />
        </>
      ) : (
        <>
          {/* 4. REEMPLAZAMOS LA PANTALLA SIMPLE POR EL STACK */}
          <Tab.Screen
            name="ChatTab" 
            component={ChatStackNavigator} // Llamamos a la función que creamos arriba
            options={{ 
              title: "Chat", 
              headerShown: false // Apagamos el header del Tab para que el Stack tome el control
            }}
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