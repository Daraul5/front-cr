// src/components/AddEventModal.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView, // ¡La magia para el teclado!
  Platform, // Para saber el sistema operativo
} from "react-native";

export default function AddEventModal({
  visible,
  onClose,
  titleValue,
  onTitleChange,
  descriptionValue,
  onDescriptionChange,
  onSave,
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      {/* Envolvemos todo en el KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        // En iOS el comportamiento 'padding' funciona mejor, en Android suele ser 'height' o dejarse sin definir
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Evento</Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. Taller de Arduino"
              placeholderTextColor="#888"
              value={titleValue}
              onChangeText={onTitleChange}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción del evento..."
              placeholderTextColor="#888"
              value={descriptionValue}
              onChangeText={onDescriptionChange}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={onSave}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// Los estilos se quedan igualitos
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#121212",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 16,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  cancelButton: { backgroundColor: "#333" },
  saveButton: { backgroundColor: "#4da6ff" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
