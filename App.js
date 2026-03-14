// App.js
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";

export default function App() {
  return (
    // NavigationContainer envuelve toda la app y gestiona el árbol de navegación
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
