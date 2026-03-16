// src/screens/ConfigScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ConfigScreen() {
  const handleLogout = () => {
    // En el futuro, esto limpiará el AuthContext y el Token JWT
    console.log("Cerrando sesión...");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {/* Un círculo simple simulando una foto de perfil */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RA</Text>
        </View>
        <Text style={styles.name}>Raul (Admin)</Text>
        <Text style={styles.email}>raul@universidad.edu</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Carrera:</Text>
          <Text style={styles.infoValue}>Ing. Mecatrónica</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Semestre:</Text>
          <Text style={styles.infoValue}>8vo</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>No. Control:</Text>
          <Text style={styles.infoValue}>19280000</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

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
