import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [numeroControl, setNumeroControl] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useContext(AuthContext);

  const handleLogin = () => {
    if (numeroControl.trim() === "" || password.trim() === "") {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }
    login(numeroControl, password);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Inicio de Sesión</Text>
          <Text style={styles.subtitle}>Panel del Club de Robótica</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Número de Control"
          placeholderTextColor="#888"
          value={numeroControl}
          onChangeText={setNumeroControl}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  formContainer: { flex: 1, justifyContent: "center", padding: 24 },
  header: { marginBottom: 32, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#a0a0a0" },
  input: { backgroundColor: "#1e1e1e", color: "#fff", padding: 16, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: "#333" },
  button: { backgroundColor: "#4da6ff", padding: 16, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkButton: { marginTop: 24, alignItems: "center" },
  linkText: { color: "#4da6ff", fontSize: 14, textDecorationLine: "underline" }
});