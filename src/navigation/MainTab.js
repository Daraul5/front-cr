// src/navigation/MainTab.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // Estilos del Header (Barra superior)
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#ffffff",

        // Estilos del Tab Bar (Barra inferior)
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopColor: "#333333", // Una línea sutil para separar la barra del fondo
        },
        tabBarActiveTintColor: "#4da6ff", // Color azul brillante cuando la pestaña está seleccionada
        tabBarInactiveTintColor: "#888888", // Color gris cuando no está seleccionada
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Eventos" }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />

      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Acceso" }}
      />
    </Tab.Navigator>
  );
}
