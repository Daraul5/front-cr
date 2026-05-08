// src/screens/HomeScreen.js
import React, { useContext, useState } from "react";
import { 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Text,
  Modal,
  Alert
} from "react-native";
import EventCard from "../components/EventCard";
import AddEventModal from "../components/AddEventModal";
import { useEvents } from "../hooks/useEvents";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const {
    events,
    modalVisible,
    setModalVisible,
    newTitle,
    setNewTitle,
    newDescription,
    newType,
    setNewType,
    allowRegistration,
    setAllowRegistration,
    capacity,
    setCapacity,
    eventDate,
    setEventDate,
    setNewDescription,
    handleAddEvent,
  } = useEvents();

  // Estados para el Modal de Detalles (el que se abre al tocar una publicación)
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Función para abrir los detalles
  const handleOpenDetails = (post) => {
    setSelectedPost(post);
    setDetailsVisible(true);
  };

  // Función para unirse a un evento
  const handleJoinEvent = () => {
    if (!user) {
      Alert.alert("Acceso Denegado", "Debes iniciar sesión para unirte a un evento.");
      return;
    }
    // Aquí en el futuro harás tu axios.post a INSCRIPCION_PUBLICACION
    Alert.alert("¡Inscrito!", `Te has unido al evento: ${selectedPost.title}`);
    setDetailsVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            date={item.date}
            description={item.description}
            tipo={item.tipo || "EVENTO"} // Le pasamos el tipo
            onPress={() => handleOpenDetails(item)} // Al tocar, abre el modal
          />
        )}
      />

      {/* Modal de Detalles de la Publicación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailsModalContent}>
            
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTag}>
                {selectedPost?.tipo === "EVENTO" ? "📌 Detalles del Evento" : "📰 Noticia"}
              </Text>
              <TouchableOpacity onPress={() => setDetailsVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.detailsTitle}>{selectedPost?.title}</Text>
            <Text style={styles.detailsDate}>📅 {selectedPost?.date}</Text>
            <Text style={styles.detailsDesc}>{selectedPost?.description}</Text>

            {/* LA MAGIA CONDICIONAL: Solo mostramos el botón si es EVENTO */}
            {selectedPost?.tipo === "EVENTO" && (
              <TouchableOpacity style={styles.joinButton} onPress={handleJoinEvent}>
                <Text style={styles.joinButtonText}>Unirse al Evento</Text>
              </TouchableOpacity>
            )}

          </View>
        </View>
      </Modal>

      {/* Botón flotante para el ADMIN (Crear nueva publicación) */}
      {user?.rol === "ADMIN" && (
        <>
          <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>

          
          <AddEventModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={handleAddEvent}
            titleValue={newTitle}
            onTitleChange={setNewTitle}
            descriptionValue={newDescription}
            onDescriptionChange={setNewDescription}
            typeValue={newType}
            onTypeChange={setNewType}
            allowReg={allowRegistration} // <-- Nuevo
            onAllowRegChange={setAllowRegistration} // <-- Nuevo
            capacityValue={capacity} // <-- Nuevo
            onCapacityChange={setCapacity} // <-- Nuevo
            dateValue={eventDate} // <-- Nuevo
            onDateChange={setEventDate} // <-- Nuevo
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  listContainer: { padding: 16, paddingBottom: 100 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4da6ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  fabIcon: { color: "#fff", fontSize: 32, fontWeight: "300", marginTop: -2 },
  
  // Estilos del nuevo Modal de Detalles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end", // Sale desde abajo
  },
  detailsModalContent: {
    backgroundColor: "#1e1e1e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: "40%",
    borderWidth: 1,
    borderColor: "#333",
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  detailsTag: {
    color: "#a0a0a0",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  closeIcon: {
    color: "#888",
    fontSize: 24,
    fontWeight: "bold",
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  detailsDate: {
    fontSize: 16,
    color: "#4da6ff",
    marginBottom: 16,
  },
  detailsDesc: {
    fontSize: 16,
    color: "#d0d0d0",
    lineHeight: 24,
    marginBottom: 24,
  },
  joinButton: {
    backgroundColor: "#4da6ff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});