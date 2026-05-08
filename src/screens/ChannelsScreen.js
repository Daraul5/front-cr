// src/screens/ChannelsScreen.js
import React, { useState, useContext } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView, // <-- 1. Nos salva del Notch en iOS
  Platform,
  StatusBar, // <-- 2. Nos salva de la barra de batería en Android
  Modal, // <-- 3. Para la ventana desplegable
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { AuthContext } from "../context/AuthContext";

const MOCK_CHANNELS = [
  { id: "1", title: "Chat General", desc: "Avisos y pláticas de todo el club" },
  { id: "2", title: "Proyecto Brazo Robótico", desc: "Equipo de manufactura y diseño 3D" },
  { id: "3", title: "Taller de Arduino", desc: "Dudas sobre sensores y microcontroladores" },
];

export default function ChannelsScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [channels, setChannels] = useState(MOCK_CHANNELS);
  
  // Estados para nuestro Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Función para guardar el nuevo canal
  const handleCreateChannel = () => {
    if (newTitle.trim() === "") return;

    const newChannel = {
      id: Date.now().toString(),
      title: newTitle,
      desc: newDesc || "Nuevo canal del club",
    };

    setChannels([...channels, newChannel]);
    setNewTitle("");
    setNewDesc("");
    setModalVisible(false);
  };

  const renderChannel = ({ item }) => (
    <TouchableOpacity 
      style={styles.channelCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("ChatRoom", { channelName: item.title, channelId: item.id })}
    >
      <View style={styles.channelInfo}>
        <Text style={styles.channelTitle}>{item.title}</Text>
        <Text style={styles.channelDesc}>{item.desc}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    // SafeAreaView empuja el contenido hacia abajo en iOS
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Canales del Club</Text>
        
        <FlatList
          data={channels}
          keyExtractor={(item) => item.id}
          renderItem={renderChannel}
          contentContainerStyle={styles.listContainer}
        />

        {/* BOTÓN FLOTANTE PARA EL ADMIN */}
        {user?.rol === "ADMIN" && (
          <TouchableOpacity 
            style={styles.fab}
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>
        )}

        {/* MODAL DESPLEGABLE PARA CREAR CANAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          {/* Fondo oscuro semi-transparente */}
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView 
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContent}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Crear Nuevo Canal</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Nombre del canal (ej. Torneo Sumo)"
                placeholderTextColor="#888"
                value={newTitle}
                onChangeText={setNewTitle}
                keyboardAppearance="dark"
              />

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descripción o propósito del canal..."
                placeholderTextColor="#888"
                value={newDesc}
                onChangeText={setNewDesc}
                multiline
                numberOfLines={3}
                keyboardAppearance="dark"
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleCreateChannel}>
                <Text style={styles.saveButtonText}>Crear Canal</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // safeArea se encarga del fondo general y del espacio superior
  safeArea: { 
    flex: 1, 
    backgroundColor: "#121212",
    // En Android, SafeAreaView no siempre funciona, así que le sumamos la altura del StatusBar nativo
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
  },
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
  channelCard: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  channelInfo: { flex: 1 },
  channelTitle: { fontSize: 18, fontWeight: "bold", color: "#ffffff", marginBottom: 4 },
  channelDesc: { fontSize: 14, color: "#a0a0a0" },
  arrow: { fontSize: 24, color: "#4da6ff", marginLeft: 10 },
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
  
  // ESTILOS DEL MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end", // Hace que el modal salga desde abajo
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
    borderWidth: 1,
    borderColor: "#333",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  closeText: {
    fontSize: 24,
    color: "#888",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#121212",
    color: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top", // Importante para Android
  },
  saveButton: {
    backgroundColor: "#4da6ff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20, // Margen extra abajo por si no hay teclado
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});