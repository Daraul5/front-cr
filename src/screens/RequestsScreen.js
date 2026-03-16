// src/screens/RequestsScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRequests } from "../hooks/useRequests"; // ¡Importamos nuestro nuevo Hook!

export default function RequestsScreen() {
  // Extraemos la lógica y el estado en una sola línea
  const { requests, handleAccept, handleReject } = useRequests();

  const renderRequest = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nombre}</Text>
      <Text style={styles.details}>
        {item.carrera} - {item.semestre} Semestre
      </Text>
      <Text style={styles.motivo}>"{item.motivo}"</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleReject(item.id)}
        >
          <Text style={styles.buttonText}>Rechazar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleAccept(item.id, item.nombre)}
        >
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Solicitudes Pendientes</Text>
      {requests.length === 0 ? (
        <Text style={styles.emptyText}>No hay solicitudes nuevas.</Text>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={renderRequest}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    padding: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  listContainer: { padding: 16 },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  details: { fontSize: 14, color: "#4da6ff", marginBottom: 8 },
  motivo: {
    fontSize: 14,
    color: "#a0a0a0",
    fontStyle: "italic",
    marginBottom: 16,
  },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  rejectButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ff4d4d",
  },
  acceptButton: { backgroundColor: "#4da6ff" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  emptyText: {
    color: "#a0a0a0",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
