// src/navigation/MainStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

// Creamos la instancia del Stack
const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio" }} // Este es el texto del header
      />
    </Stack.Navigator>
  );
}
