// src/hooks/useEvents.js
import { useState } from "react";

// Datos de prueba iniciales
const MOCK_EVENTS = [
  {
    id: "1",
    title: "Taller de Soldadura",
    date: "12 de Mayo",
    description: "Aprende las bases para armar tus propios circuitos.",
    tipo: "EVENTO",
    permite_inscripcion: true,
    capacidad: 15,
  },
  {
    id: "2",
    title: "Nueva Cafetera en el Lab",
    date: "08 de Mayo",
    description: "Ya pueden pasar por su dosis de cafeína matutina.",
    tipo: "NOTICIA",
    permite_inscripcion: false,
    capacidad: 0,
  },
];

export function useEvents() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estados del formulario
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newType, setNewType] = useState("EVENTO");
  const [allowRegistration, setAllowRegistration] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleAddEvent = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") return;

    const newEntry = {
      id: Date.now().toString(),
      title: newTitle, // Usamos 'title' para que coincida con EventCard
      date: eventDate || "Fecha por definir", // Usamos 'date'
      description: newDescription,
      tipo: newType,
      permite_inscripcion: allowRegistration,
      capacidad: allowRegistration ? parseInt(capacity) : 0,
    };

    // Agregamos el nuevo evento al principio de la lista
    setEvents([newEntry, ...events]);
    
    // Limpiamos el formulario
    setNewTitle("");
    setNewDescription("");
    setNewType("EVENTO");
    setAllowRegistration(false);
    setCapacity("");
    setEventDate("");
    setModalVisible(false);
  };

  // Exportamos todo para que HomeScreen lo pueda usar
  return {
    events, 
    modalVisible, setModalVisible,
    newTitle, setNewTitle,
    newDescription, setNewDescription,
    newType, setNewType,
    allowRegistration, setAllowRegistration,
    capacity, setCapacity,
    eventDate, setEventDate,
    handleAddEvent,
  };
}