// src/hooks/useRequests.js
import { useState } from "react";
import { Alert } from "react-native";

// Datos falsos de solicitudes pendientes
const MOCK_REQUESTS = [
  {
    id: "1",
    nombre: "Ana López",
    carrera: "Ing. Sistemas",
    semestre: "4to",
    motivo: "Quiero aprender a programar brazos robóticos.",
  },
  {
    id: "2",
    nombre: "Carlos Ruiz",
    carrera: "Ing. Electrónica",
    semestre: "6to",
    motivo: "Me apasiona la automatización.",
  },
];

export function useRequests() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleAccept = (id, nombre) => {
    // En el futuro, esto se conectará con el backend de Java
    setRequests(requests.filter((req) => req.id !== id));
    Alert.alert("Aceptado", `Se ha generado la cuenta para ${nombre}.`);
  };

  const handleReject = (id) => {
    // Aquí también avisaremos al backend que se rechazó la solicitud
    setRequests(requests.filter((req) => req.id !== id));
  };

  // Exportamos lo que la pantalla necesita para funcionar
  return {
    requests,
    handleAccept,
    handleReject,
  };
}
