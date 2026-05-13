import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

// Importamos todas tus pantallas
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen"; 
import ChannelsScreen from "../screens/ChannelsScreen"; 
import ConfigScreen from "../screens/ConfigScreen";
import RequestsScreen from "../screens/RequestsScreen";
import EventDetailScreen from "../screens/EventDetailScreen"; // <-- 1. NUEVA IMPORTACIÓN

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// STACK DE AUTENTICACIÓN
function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

// STACK DEL CHAT
function ChatStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen 
        name="Channels" 
        component={ChannelsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatScreen} 
        options={({ route }) => ({ 
          title: route.params?.channelName || "Sala de Chat",
          headerBackTitleVisible: false,
        })} 
      />
    </Stack.Navigator>
  );
}

// 2. NUEVO: STACK DE INICIO (Agrupa las publicaciones y los detalles del evento)
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ title: "Inicio" }} 
      />
      <Stack.Screen 
        name="EventDetail" 
        component={EventDetailScreen} 
        options={{ 
          title: "Detalles", 
          headerBackTitleVisible: false 
        }} 
      />
    </Stack.Navigator>
  );
}

export default function MainTab() {
  const { userToken, user } = useContext(AuthContext);

  const isAdmin = user?.role === "PRESIDENTE" || user?.role === "MESA";

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#ffffff",
        tabBarStyle: { 
          backgroundColor: "#000000", 
          borderTopColor: "#333333",
          height: 60,
          paddingBottom: 8
        },
        tabBarActiveTintColor: "#4da6ff",
        tabBarInactiveTintColor: "#888888",
      }}
    >
      {/* 3. ACTUALIZACIÓN: Llamamos al nuevo HomeStackNavigator en lugar de solo HomeScreen */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ 
          title: "Inicio",
          headerShown: false // Apagamos el header del Tab porque el Stack ya tiene el suyo
        }}
      />

      {userToken === null ? (
        // --- PESTAÑA ÚNICA PARA NO LOGUEADOS ---
        <Tab.Screen
          name="AuthTab"
          component={AuthStackNavigator}
          options={{ 
            title: "Cuenta",
            headerShown: false
          }}
        />
      ) : (
        // --- PESTAÑAS PARA MIEMBROS DEL CLUB ---
        <>
          <Tab.Screen
            name="ChatTab" 
            component={ChatStackNavigator} 
            options={{ 
              title: "Chat", 
              headerShown: false 
            }}
          />

          {isAdmin && (
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