// src/navigation/MainStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ConfigScreen from "../screens/ConfigScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Eventos" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Acceso" }}
      />
      <Stack.Screen
        name="Config"
        component={ConfigScreen}
        options={{ title: "Ajustes" }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: "Chat del Club" }}
      />
    </Stack.Navigator>
  );
}
