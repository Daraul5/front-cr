// src/screens/ChatScreen.js
import React from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // ¡La librería mágica de iconos!
import ChatBubble from "../components/ChatBubble";
import { useChat } from "../hooks/useChat"; // Importamos el cerebro

export default function ChatScreen() {
  // Extraemos las variables y funciones desde nuestro Hook
  const { messages, inputText, setInputText, handleSend } = useChat();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        renderItem={({ item }) => (
          <ChatBubble
            text={item.text}
            sender={item.sender}
            time={item.time}
            isOwnMessage={item.isOwnMessage}
          />
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />

        {/* Aquí está tu nuevo botón con forma de avioncito */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons
            name="send"
            size={20}
            color="#fff"
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  chatContainer: { padding: 16, flexGrow: 1, justifyContent: "flex-end" },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#1e1e1e",
    borderTopWidth: 1,
    borderTopColor: "#333",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: "#121212",
    color: "#fff",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#4da6ff",
    width: 44, // Le damos un ancho y alto fijos para hacerlo un círculo perfecto
    height: 44,
    borderRadius: 22, // La mitad de 44
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginBottom: 2,
  },
  sendIcon: {
    marginLeft: 4, // Un truco visual: el icono del avioncito suele verse desfasado, esto lo centra perfectamente en el círculo
  },
});
