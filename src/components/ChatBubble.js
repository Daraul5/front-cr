// src/components/ChatBubble.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ChatBubble({ text, sender, time, isOwnMessage }) {
  return (
    // El contenedor principal se alinea a la derecha o izquierda dependiendo de quién lo envía
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownContainer : styles.otherContainer,
      ]}
    >
      {/* Solo mostramos el nombre del remitente si NO es nuestro propio mensaje */}
      {!isOwnMessage && <Text style={styles.senderName}>{sender}</Text>}

      {/* La burbuja cambia de color dependiendo de quién la envía */}
      <View
        style={[
          styles.bubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isOwnMessage ? styles.ownText : styles.otherText,
          ]}
        >
          {text}
        </Text>
      </View>

      {/* La hora del mensaje */}
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: "80%", // Evita que la burbuja ocupe toda la pantalla horizontalmente
  },
  ownContainer: {
    alignSelf: "flex-end", // Lo empuja a la derecha
  },
  otherContainer: {
    alignSelf: "flex-start", // Lo empuja a la izquierda
  },
  senderName: {
    fontSize: 12,
    color: "#a0a0a0",
    marginBottom: 4,
    marginLeft: 4,
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
  },
  ownBubble: {
    backgroundColor: "#4da6ff", // Azul robótico para tus mensajes
    borderBottomRightRadius: 4, // Le da ese efecto de "colita" de mensaje nativo
  },
  otherBubble: {
    backgroundColor: "#1e1e1e", // Gris oscuro para los demás
    borderWidth: 1,
    borderColor: "#333",
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  ownText: {
    color: "#ffffff",
  },
  otherText: {
    color: "#e0e0e0",
  },
  time: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
    alignSelf: "flex-end", // La hora siempre a la derecha de la burbuja
  },
});
