// src/screens/HomeScreen.js
import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import EventCard from "../components/EventCard";
import AddEventModal from "../components/AddEventModal"; // ¡Importamos nuestro nuevo componente!
import { useEvents } from "../hooks/useEvents";

export default function HomeScreen() {
  const {
    events,
    modalVisible,
    setModalVisible,
    newTitle,
    setNewTitle,
    newDescription,
    setNewDescription,
    handleAddEvent,
  } = useEvents();

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
          />
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Aquí mandamos a llamar a nuestro componente Modal aislado */}
      <AddEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // Le pasamos la función para que se sepa cerrar a sí mismo
        titleValue={newTitle}
        onTitleChange={setNewTitle}
        descriptionValue={newDescription}
        onDescriptionChange={setNewDescription}
        onSave={handleAddEvent}
      />
    </View>
  );
}

// Estilos súper reducidos, solo lo que le pertenece al fondo, la lista y el botón flotante
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  listContainer: { padding: 16, paddingBottom: 100 },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4da6ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabIcon: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    lineHeight: 34,
  },
});
