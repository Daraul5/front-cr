// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aquí es donde mandaremos el correo y contraseña al backend en el futuro
    console.log("Intentando iniciar sesión con:", correo);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido de vuelta</Text>
          <Text style={styles.subtitle}>
            Ingresa al panel del Club de Robótica
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Correo institucional"
          placeholderTextColor="#888"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address" // Muestra el teclado con el "@" a la mano
          autoCapitalize="none"
          keyboardAppearance="dark" // Evita que la primera letra sea mayúscula (útil para correos)
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          keyboardAppearance="dark" // ¡Esta es la magia que oculta el texto con puntitos!
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Enlace para regresar a la pantalla de registro */}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.linkText}>
            ¿Aún no envías tu solicitud? Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4da6ff", // Azul robótico
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkButton: {
    marginTop: 24,
    alignItems: "center",
  },
  linkText: {
    color: "#4da6ff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
