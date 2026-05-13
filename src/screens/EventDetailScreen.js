import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function EventDetailScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  
  // Recibimos el evento que el usuario tocó en la pantalla anterior
  const { evento } = route.params; 
  const [loading, setLoading] = useState(false);

  const handleInscripcion = async () => {
    setLoading(true);
    try {
      // Mandamos la matrícula del usuario actual y el ID de la publicación
      const inscripcionData = {
        user: { controlNumber: user.controlNumber },
        publication: { idPublication: evento.idPublication }
      };

      // Ajusta la ruta "/inscriptions" según cómo lo vayas a nombrar en tu Java
      await api.post("/inscriptions", inscripcionData);
      
      Alert.alert("¡Inscrito!", "Te has registrado exitosamente en este evento.");
      navigation.goBack(); // Regresamos al menú principal
      
    } catch (error) {
      console.error("Error al inscribirse:", error);
      Alert.alert("Error", "No se pudo realizar la inscripción. ¿Quizás ya estás inscrito?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.typeBadge}>{evento.type}</Text>
      <Text style={styles.title}>{evento.tittle}</Text>
      
      <View style={styles.infoBox}>
        {evento.eventDate && (
          <Text style={styles.infoText}>📅 Fecha: {evento.eventDate}</Text>
        )}
        {evento.doInscription && (
          <Text style={styles.infoText}>👥 Capacidad total: {evento.capacity || "Ilimitada"}</Text>
        )}
      </View>

      <Text style={styles.descriptionLabel}>Descripción:</Text>
      <Text style={styles.description}>{evento.description}</Text>

      {/* Solo mostramos el botón si el evento admite inscripciones */}
      {evento.doInscription ? (
        <TouchableOpacity 
          style={styles.joinButton} 
          onPress={handleInscripcion}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.joinButtonText}>Unirme al Evento</Text>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.noInscriptionBox}>
          <Text style={styles.noInscriptionText}>Este es un anuncio informativo, no requiere inscripción.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  typeBadge: { color: "#4da6ff", fontWeight: "bold", fontSize: 14, marginBottom: 10, textTransform: "uppercase" },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  infoBox: { backgroundColor: "#1e1e1e", padding: 15, borderRadius: 10, borderWidth: 1, borderColor: "#333", marginBottom: 20 },
  infoText: { color: "#ccc", fontSize: 16, marginBottom: 5 },
  descriptionLabel: { color: "#888", fontSize: 14, marginBottom: 5, textTransform: "uppercase" },
  description: { fontSize: 16, color: "#fff", lineHeight: 24, marginBottom: 40 },
  joinButton: { backgroundColor: "#00b33c", padding: 18, borderRadius: 12, alignItems: "center" },
  joinButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  noInscriptionBox: { backgroundColor: "#333", padding: 15, borderRadius: 10, alignItems: "center" },
  noInscriptionText: { color: "#aaa", fontSize: 14 }
});