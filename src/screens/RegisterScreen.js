// src/screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  // Estados para los 6 campos solicitados
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [numeroControl, setNumeroControl] = useState("");
  const [correo, setCorreo] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleRegister = () => {
    // Aquí luego enviaremos los datos a la pestaña de solicitudes del Admin
    console.log("Solicitud enviada:", {
      nombre,
      carrera,
      semestre,
      numeroControl,
      correo,
      motivo,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* ScrollView permite deslizar el contenido cuando el teclado lo empuja */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Únete al Club</Text>
          <Text style={styles.subtitle}>
            Envía tu solicitud para evaluación
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#888"
            value={nombre}
            onChangeText={setNombre}
            keyboardAppearance="dark"
          />

          <TextInput
            style={styles.input}
            placeholder="Carrera"
            placeholderTextColor="#888"
            value={carrera}
            onChangeText={setCarrera}
            keyboardAppearance="dark"
          />

          {/* Fila para agrupar Semestre y No. de Control para ahorrar espacio */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Semestre (Ej. 6to)"
              placeholderTextColor="#888"
              value={semestre}
              onChangeText={setSemestre}
              keyboardAppearance="dark"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="No. de Control"
              placeholderTextColor="#888"
              value={numeroControl}
              onChangeText={setNumeroControl}
              keyboardType="numeric"
              keyboardAppearance="dark" // Muestra el teclado numérico en el celular
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Correo institucional"
            placeholderTextColor="#888"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            keyboardAppearance="dark" // Evita que la primera letra se ponga en mayúscula
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="¿Por qué quieres unirte al Club de Robótica?"
            placeholderTextColor="#888"
            value={motivo}
            onChangeText={setMotivo}
            multiline
            keyboardAppearance="dark"
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Enviar Solicitud</Text>
          </TouchableOpacity>

          {/* Botón para cambiar al Login si ya tienen cuenta */}
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.linkText}>
              ¿Ya fuiste aceptado? Inicia sesión aquí
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContainer: {
    padding: 24,
    flexGrow: 1, // Asegura que el contenido se expanda correctamente
    justifyContent: "center",
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
  form: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%", // Cada uno ocupa un poco menos de la mitad para dejar margen
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
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4da6ff",
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
