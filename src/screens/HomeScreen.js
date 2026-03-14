// src/screens/HomeScreen.js
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Panel Principal de Robótica!</Text>
      <Text style={styles.subtitle}>Sistema en línea</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
    backgroundColor: "#121212", // Un gris casi negro, más suave a la vista que el #000000 puro
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff", // Texto en color blanco
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0", // Un gris claro para el subtítulo
  },
});
