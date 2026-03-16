// src/screens/ConfigScreen.js
import React, { useContext } from "react"; // <-- 1. Agregamos useContext
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext"; // <-- 2. Importamos tu contexto

export default function ConfigScreen() {
  // 3. Extraemos al usuario actual y la función para salir
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // 4. Ejecutamos la salida global
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          {/* Mostramos la primera letra del nombre dinámicamente */}
          <Text style={styles.avatarText}>
            {user?.nombre ? user.nombre.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>

        {/* Usamos los datos reales del contexto */}
        <Text style={styles.name}>{user?.nombre || "Usuario"}</Text>
        <Text style={styles.email}>
          {user?.correo || "correo@universidad.edu"}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Rol actual:</Text>
          <Text style={styles.infoValue}>{user?.rol || "USER"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Carrera:</Text>
          <Text style={styles.infoValue}>Ing. Mecatrónica</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Estado:</Text>
          <Text style={[styles.infoValue, { color: "#4da6ff" }]}>Activo</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... (Tus estilos se quedan exactamente igual)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 24 },
  profileHeader: { alignItems: "center", marginBottom: 40, marginTop: 20 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4da6ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: { fontSize: 36, fontWeight: "bold", color: "#fff" },
  name: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  email: { fontSize: 16, color: "#a0a0a0" },
  infoSection: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  infoLabel: { fontSize: 16, color: "#a0a0a0" },
  infoValue: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  }, // Rojo para la acción destructiva
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
