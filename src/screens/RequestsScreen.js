import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert,
  RefreshControl
} from "react-native";
import api from "../api/api";

export default function RequestsScreen() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSolicitudes = async () => {
    try {
      const response = await api.get("/applications/pending");
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
      Alert.alert("Error", "No se pudieron cargar las solicitudes pendientes.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const handleAprobar = async (id) => {
    try {
      await api.put(`/applications/${id}/approve`);
      Alert.alert("Aprobado", "El usuario ha sido aceptado y ahora es MIEMBRO del club.");
      // Actualizamos la lista localmente para quitar la tarjeta sin recargar todo
      setSolicitudes(solicitudes.filter(item => item.idApplication !== id));
    } catch (error) {
      console.error("Error al aprobar:", error);
      Alert.alert("Error", "No se pudo aprobar la solicitud.");
    }
  };

  const handleRechazar = async (id) => {
    Alert.alert(
      "Confirmar Rechazo",
      "¿Estás seguro de que deseas rechazar esta solicitud?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, rechazar", 
          style: "destructive",
          onPress: async () => {
            try {
              await api.put(`/applications/${id}/reject`);
              setSolicitudes(solicitudes.filter(item => item.idApplication !== id));
            } catch (error) {
              console.error("Error al rechazar:", error);
              Alert.alert("Error", "No se pudo rechazar la solicitud.");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Panel de Administración</Text>
        <Text style={styles.subHeader}>
          Solicitudes Pendientes: {solicitudes.length}
        </Text>
      </View>

      <FlatList
        data={solicitudes}
        keyExtractor={(item) => item.idApplication?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={() => { setRefreshing(true); fetchSolicitudes(); }} 
            tintColor="#4da6ff" 
          />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.user?.name || "Usuario Desconocido"}</Text>
              <Text style={styles.control}>Matrícula: {item.user?.controlNumber}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>Habilidades:</Text>
              <Text style={styles.text}>{item.skills}</Text>

              <Text style={styles.label}>Motivos:</Text>
              <Text style={styles.text}>{item.reason}</Text>

              <Text style={styles.label}>Proyectos Previos:</Text>
              <Text style={styles.text}>{item.projects}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.btnReject]} 
                onPress={() => handleRechazar(item.idApplication)}
              >
                <Text style={styles.buttonText}>Rechazar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.btnApprove]} 
                onPress={() => handleAprobar(item.idApplication)}
              >
                <Text style={styles.buttonText}>Aprobar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay solicitudes pendientes por revisar.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  centered: { justifyContent: "center", alignItems: "center" },
  header: { padding: 20, backgroundColor: "#1a1a1a", borderBottomWidth: 1, borderBottomColor: "#333" },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subHeader: { fontSize: 16, color: "#4da6ff", marginTop: 5 },
  listContainer: { padding: 16, paddingBottom: 50 },
  card: { backgroundColor: "#1e1e1e", borderRadius: 12, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: "#333" },
  cardHeader: { borderBottomWidth: 1, borderBottomColor: "#333", paddingBottom: 10, marginBottom: 15 },
  name: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  control: { fontSize: 14, color: "#a0a0a0", marginTop: 4 },
  infoBox: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "bold", color: "#4da6ff", marginBottom: 4, marginTop: 10 },
  text: { fontSize: 15, color: "#eee", lineHeight: 22 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  button: { flex: 1, padding: 14, borderRadius: 8, alignItems: "center", marginHorizontal: 5 },
  btnReject: { backgroundColor: "#cc0000" },
  btnApprove: { backgroundColor: "#00b33c" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  emptyText: { color: "#888", textAlign: "center", marginTop: 50, fontSize: 16 }
});