import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al iniciar la app, recuperamos el token y los datos del usuario si existen
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const userData = await AsyncStorage.getItem("userData"); // Recuperamos el rol guardado

        if (token) {
          setUserToken(token);
          if (userData) {
            setUser(JSON.parse(userData)); // Restauramos el rol y nombre en el estado
          }
        }
      } catch (e) {
        console.log("Error cargando datos almacenados:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadStoredData();
  }, []);

  const login = async (numeroControl, password) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        controlNumber: numeroControl,
        password: password,
      });

      // ¡Atrapamos el token, el rol y el nombre que nos manda el backend!
      const { token, role, name } = response.data;
      
      const loggedUser = { 
        controlNumber: numeroControl, 
        role: role, 
        name: name 
      };

      // Guardamos físicamente en la memoria del celular
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userData", JSON.stringify(loggedUser)); // Guardamos el usuario como texto
      
      // Guardamos en el estado de React para que la pantalla se actualice de inmediato
      setUserToken(token);
      setUser(loggedUser);

    } catch (e) {
      console.error("Error en login:", e);
      throw e; 
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Limpiamos todo al salir
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userData");
    setUserToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, userToken, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};