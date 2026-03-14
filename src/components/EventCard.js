// src/components/EventCard.js
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Recibimos las "props" (propiedades) para que la tarjeta sea dinámica
export default function EventCard({ title, date, description }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>📅 {date}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e", // Un gris un poco más claro que el fondo para que resalte
    padding: 16,
    borderRadius: 12, // Bordes redondeados modernos
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333", // Borde sutil
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: "#4da6ff", // Azul robótico para la fecha
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#a0a0a0",
    lineHeight: 20,
  },
});
