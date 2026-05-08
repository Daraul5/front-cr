// src/hooks/useChat.js
import { useState, useEffect } from "react";

// Nuestros datos falsos temporales, ahora estructurados por canal (channelId)
const MOCK_MESSAGES = [
  // Mensajes del Chat General (channelId: "1")
  {
    id: "1",
    channelId: "1",
    text: "¡Hola a todos! ¿Listos para el hackathon?",
    sender: "Ana López",
    time: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: "2",
    channelId: "1",
    text: "¡Nací listo! Ya tengo los motores calibrados.",
    sender: "David R. Vázquez Yáñez",
    time: "10:02 AM",
    isOwnMessage: true,
  },
  {
    id: "3",
    channelId: "1",
    text: "¿Alguien trae cautín de repuesto? El mío murió.",
    sender: "Carlos Ruiz",
    time: "10:05 AM",
    isOwnMessage: false,
  },
  // Mensajes del Proyecto Brazo Robótico (channelId: "2")
  {
    id: "4",
    channelId: "2",
    text: "Acabo de subir las piezas para impresión 3D.",
    sender: "Valeria",
    time: "11:00 AM",
    isOwnMessage: false,
  },
];

export function useChat(channelId) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  // Este useEffect actúa como tu futura petición Axios. 
  // Cada vez que entres a un canal, filtrará la base de datos por ese ID.
  useEffect(() => {
    const channelMessages = MOCK_MESSAGES.filter(
      (msg) => msg.channelId === channelId
    );
    setMessages(channelMessages);
  }, [channelId]);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      channelId: channelId, // Le inyectamos el ID para saber dónde se guardó
      text: inputText,
      sender: "David R. Vázquez Yáñez", // En el futuro vendrá de tu AuthContext
      time: "Ahora",
      isOwnMessage: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");
  };

  // Exportamos solo lo que la vista necesita
  return {
    messages,
    inputText,
    setInputText,
    handleSend,
  };
}