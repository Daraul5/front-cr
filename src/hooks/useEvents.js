// src/hooks/useEvents.js
import { useState } from "react";

// Nuestros datos iniciales
const INITIAL_EVENTS = [
  {
    id: "1",
    title: "Torneo de Sumobots",
    date: "15 de Abril, 2026",
    description:
      "Competencia interna de mini sumobots autónomos. Trae tus baterías cargadas.",
  },
];

export function useEvents() {
  // 1. Aquí guardamos todos los estados
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // 2. Aquí definimos las funciones y la lógica
  const handleAddEvent = () => {
    if (newTitle.trim() === "") return;

    const newEvent = {
      id: Date.now().toString(),
      title: newTitle,
      date: "Fecha por definir",
      description: newDescription || "Sin descripción.",
    };

    setEvents([newEvent, ...events]);
    setNewTitle("");
    setNewDescription("");
    setModalVisible(false);
  };

  // 3. Devolvemos (exportamos) solo lo que la pantalla necesita para pintar
  return {
    events,
    modalVisible,
    setModalVisible,
    newTitle,
    setNewTitle,
    newDescription,
    setNewDescription,
    handleAddEvent,
  };
}
