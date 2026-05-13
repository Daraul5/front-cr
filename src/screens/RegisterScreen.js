import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import api from "../api/api";

export default function RegisterScreen({ navigation }) {
  // Estados para datos personales
  const [nombre, setNombre] = useState("");
  const [numeroControl, setNumeroControl] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [carrera, setCarrera] = useState("1"); // ID por defecto

  // Estados para la solicitud al club
  const [habilidades, setHabilidades] = useState("");
  const [motivos, setMotivos] = useState("");
  const [proyectos, setProyectos] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validamos que ningún campo se vaya vacío
    if (!nombre || !numeroControl || !correo || !password || !habilidades || !motivos || !proyectos) {
      Alert.alert("Error", "Todos los campos de la solicitud son obligatorios.");
      return;
    }

    setLoading(true);

    // Armamos el objeto exactamente como lo espera el RegisterRequest de Java
    const nuevoUsuario = {
      controlNumber: numeroControl,
      name: nombre,
      email: correo,
      password: password,
      phone: "0000000000",
      career: {
        idCareer: parseInt(carrera) 
      },
      // Campos nuevos para la tabla 'solicitud'
      skills: habilidades,
      reason: motivos,
      projects: proyectos
    };

    try {
      await api.post("/auth/register", nuevoUsuario);
      Alert.alert("Solicitud Enviada", "Tus datos han sido recibidos y están en estado PENDIENTE.");
      // Limpiamos los campos (opcional) y mandamos al usuario al Login
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error en registro:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo enviar la solicitud. Verifica tus datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Solicitud de Ingreso</Text>
        <Text style={styles.subtitle}>Completa tu perfil para unirte al club</Text>

        <View style={styles.form}>
          {/* DATOS PERSONALES */}
          <Text style={styles.sectionTitle}>Datos Personales</Text>

          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#555"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Número de Control</Text>
          <TextInput
            style={styles.input}
            placeholder="Matricula"
            placeholderTextColor="#555"
            value={numeroControl}
            onChangeText={setNumeroControl}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Correo Institucional</Text>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@tuxtla.tecnm.mx"
            placeholderTextColor="#555"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#555"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* PERFIL DE INGRESO */}
          <Text style={styles.sectionTitle}>Perfil Técnico</Text>

          <Text style={styles.label}>Habilidades (Lenguajes, herramientas)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ej. Programacion en C++, Arduino..."
            placeholderTextColor="#555"
            value={habilidades}
            onChangeText={setHabilidades}
            multiline={true}
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Motivos para unirte</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ej. Quiero aprender a armar robots..."
            placeholderTextColor="#555"
            value={motivos}
            onChangeText={setMotivos}
            multiline={true}
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Proyectos previos</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ej. Brazo robotico en 2do semestre o Ninguno"
            placeholderTextColor="#555"
            value={proyectos}
            onChangeText={setProyectos}
            multiline={true}
            numberOfLines={3}
            textAlignVertical="top"
          />

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar Solicitud</Text>
            )}
          </TouchableOpacity>

          {/* Enlace corregido para navegar al Login */}
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.link}>
            <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  scrollContainer: { padding: 24, paddingVertical: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", textAlign: "center", marginTop: 20 },
  subtitle: { fontSize: 16, color: "#a0a0a0", textAlign: "center", marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginTop: 15, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#333", paddingBottom: 5 },
  form: { marginTop: 10 },
  label: { color: "#4da6ff", fontSize: 14, marginBottom: 8, fontWeight: "600" },
  input: { backgroundColor: "#1e1e1e", color: "#fff", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#333", marginBottom: 20 },
  textArea: { minHeight: 100 },
  button: { backgroundColor: "#4da6ff", padding: 18, borderRadius: 12, alignItems: "center", marginTop: 10, marginBottom: 20 },
  buttonDisabled: { backgroundColor: "#2a5a8a" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  link: { marginBottom: 30, alignItems: "center" },
  linkText: { color: "#4da6ff", textDecorationLine: "underline" }
});