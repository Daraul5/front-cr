// src/hooks/useChat.js
import { useState } from "react";

// Nuestros datos falsos temporales
const MOCK_MESSAGES = [
  {
    id: "1",
    text: "¡Hola a todos! ¿Listos para el hackathon?",
    sender: "Ana López",
    time: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: "2",
    text: "¡Nací listo! Ya tengo los motores calibrados.",
    sender: "Raul",
    time: "10:02 AM",
    isOwnMessage: true,
  },
  {
    id: "3",
    text: "¿Alguien trae cautín de repuesto? El mío murió.",
    sender: "Carlos Ruiz",
    time: "10:05 AM",
    isOwnMessage: false,
  },
];

export function useChat() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "Raul", // En el futuro, esto lo sacaremos de tu sesión real
      time: "Ahora",
      isOwnMessage: true,
    };

    setMessages([...messages, newMessage]);
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
