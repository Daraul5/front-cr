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

// 1. RECIBIMOS 'route' EN LAS PROPIEDADES
export default function ChatScreen({ route }) {
  // 2. EXTRAEMOS LOS DATOS DEL CANAL QUE TOCAMOS EN LA LISTA
  const { channelId = "1", channelName = "Chat General" } = route?.params || {};

  // 3. LE PASAMOS EL ID AL HOOK PARA QUE SOLO TRAIGA MENSAJES DE ESTE CANAL
  const { messages, inputText, setInputText, handleSend } = useChat(channelId);

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
          placeholder={`Mensaje en ${channelName}...`} // 4. PLACEHOLDER DINÁMICO
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          multiline
          keyboardAppearance="dark"
        />

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
    width: 44, 
    height: 44,
    borderRadius: 22, 
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginBottom: 2,
  },
  sendIcon: {
    marginLeft: 4, 
  },
});