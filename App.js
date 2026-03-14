// App.js
import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./src/navigation/MainTab";

export default function App() {
  return (
    // NavigationContainer envuelve toda la app y gestiona el árbol de navegación
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
}
