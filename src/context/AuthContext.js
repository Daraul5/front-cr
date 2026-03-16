// src/context/AuthContext.js
import React, { createContext, useState } from "react";

// Creamos el contexto (la tubería invisible que conectará toda la app)
export const AuthContext = createContext();

// Creamos el "Proveedor" que envolverá a la app
export const AuthProvider = ({ children }) => {
  // Estado global del usuario. Si es 'null', nadie ha iniciado sesión.
  const [user, setUser] = useState(null);

  // Función simulada de Login
  const login = (correo, password) => {
    // En el futuro, aquí harás tu petición axios.post() a tu backend en Java
    // Por ahora, haremos un pequeño truco: si escribes "admin", te da rol de administrador.
    if (correo.toLowerCase().includes("admin")) {
      setUser({ nombre: "Raul (Admin)", correo, rol: "ADMIN" });
    } else {
      setUser({ nombre: "Estudiante", correo, rol: "USER" });
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
