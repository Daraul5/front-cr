// src/components/EventCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Agregamos 'tipo' y 'onPress' a las propiedades
export default function EventCard({ title, date, description, tipo, onPress }) {
  const isEvent = tipo === "EVENTO";

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.date}>📅 {date}</Text>
        
        {/* Etiqueta visual dinámica */}
        <View style={[styles.badge, isEvent ? styles.badgeEvent : styles.badgeNews]}>
          <Text style={styles.badgeText}>{isEvent ? "Evento" : "Noticia"}</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeEvent: {
    backgroundColor: "rgba(77, 166, 255, 0.2)", // Azul transparente
    borderWidth: 1,
    borderColor: "#4da6ff",
  },
  badgeNews: {
    backgroundColor: "rgba(255, 153, 0, 0.2)", // Naranja transparente
    borderWidth: 1,
    borderColor: "#ff9900",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: "#4da6ff",
  },
  description: {
    fontSize: 14,
    color: "#a0a0a0",
    lineHeight: 20,
  },
});