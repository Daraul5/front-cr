// src/screens/RequestsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

// Datos falsos de solicitudes pendientes
const MOCK_REQUESTS = [
  {
    id: "1",
    nombre: "Ana López",
    carrera: "Ing. Sistemas",
    semestre: "4to",
    motivo: "Quiero aprender a programar brazos robóticos.",
  },
  {
    id: "2",
    nombre: "Carlos Ruiz",
    carrera: "Ing. Electrónica",
    semestre: "6to",
    motivo: "Me apasiona la automatización.",
  },
];

export default function RequestsScreen() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleAccept = (id, nombre) => {
    // En el futuro, esto le dirá al backend de Java que genere la contraseña y envíe el correo
    setRequests(requests.filter((req) => req.id !== id));
    Alert.alert("Aceptado", `Se ha generado la cuenta para ${nombre}.`);
  };

  const handleReject = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

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
  }, // Botón fantasma rojo
  acceptButton: { backgroundColor: "#4da6ff" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  emptyText: {
    color: "#a0a0a0",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
