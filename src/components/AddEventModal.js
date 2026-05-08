// src/components/AddEventModal.js
import React from "react";
import { 
  View, Text, StyleSheet, Modal, TextInput, 
  TouchableOpacity, KeyboardAvoidingView, Platform, Switch, ScrollView 
} from "react-native";

export default function AddEventModal({ 
  visible, onClose, onSave,
  titleValue, onTitleChange,
  descriptionValue, onDescriptionChange,
  typeValue, onTypeChange,
  allowReg, onAllowRegChange,
  capacityValue, onCapacityChange,
  dateValue, onDateChange
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAvoidingView 
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>Nueva Publicación</Text>

            {/* Selector de Tipo */}
            <View style={styles.typeSelector}>
              <TouchableOpacity 
                style={[styles.typeButton, typeValue === "EVENTO" && styles.typeButtonActive]}
                onPress={() => onTypeChange("EVENTO")}
              >
                <Text style={[styles.typeButtonText, typeValue === "EVENTO" && styles.textActive]}>Evento</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.typeButton, typeValue === "NOTICIA" && styles.typeButtonActive]}
                onPress={() => onTypeChange("NOTICIA")}
              >
                <Text style={[styles.typeButtonText, typeValue === "NOTICIA" && styles.textActive]}>Noticia</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Título de la publicación"
              placeholderTextColor="#888"
              value={titleValue}
              onChangeText={onTitleChange}
            />

            <TextInput
              style={styles.input}
              placeholder="Fecha (ej. 25 de Mayo, 10:00 AM)"
              placeholderTextColor="#888"
              value={dateValue}
              onChangeText={onDateChange}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción detallada..."
              placeholderTextColor="#888"
              value={descriptionValue}
              onChangeText={onDescriptionChange}
              multiline
            />

            {/* Configuración de Inscripción (Solo si es Evento) */}
            {typeValue === "EVENTO" && (
              <View style={styles.eventConfig}>
                <View style={styles.switchRow}>
                  <Text style={styles.label}>¿Permitir inscripción?</Text>
                  <Switch 
                    value={allowReg} 
                    onValueChange={onAllowRegChange}
                    trackColor={{ false: "#333", true: "#4da6ff" }}
                  />
                </View>

                {allowReg && (
                  <TextInput
                    style={styles.input}
                    placeholder="Capacidad máxima (ej. 30)"
                    placeholderTextColor="#888"
                    value={capacityValue}
                    onChangeText={onCapacityChange}
                    keyboardType="numeric"
                  />
                )}
              </View>
            )}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Text style={styles.saveText}>Publicar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", padding: 20 },
  modalContent: { backgroundColor: "#1e1e1e", borderRadius: 20, padding: 20, maxHeight: "90%" },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  typeSelector: { flexDirection: "row", marginBottom: 15, gap: 10 },
  typeButton: { flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#333", alignItems: "center" },
  typeButtonActive: { backgroundColor: "#4da6ff", borderColor: "#4da6ff" },
  typeButtonText: { color: "#888", fontWeight: "bold" },
  textActive: { color: "#fff" },
  input: { backgroundColor: "#121212", color: "#fff", padding: 14, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: "#333" },
  textArea: { minHeight: 80, textAlignVertical: "top" },
  eventConfig: { backgroundColor: "#252525", padding: 15, borderRadius: 12, marginBottom: 15 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  label: { color: "#ddd", fontSize: 16 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingBottom: 10 },
  cancelButton: { padding: 12 },
  cancelText: { color: "#ff4d4d", fontWeight: "bold" },
  saveButton: { backgroundColor: "#4da6ff", paddingHorizontal: 25, paddingVertical: 12, borderRadius: 10 },
  saveText: { color: "#fff", fontWeight: "bold" },
});