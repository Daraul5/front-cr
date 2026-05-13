import React, { useContext } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ConfigScreen() {
  // Extraemos al usuario actual y la función de logout directamente de tu contexto
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas salir de tu cuenta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, salir", 
          style: "destructive",
          onPress: () => logout() 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>

      {/* Tarjeta de Información del Usuario */}
      <View style={styles.card}>
        <Text style={styles.label}>Nombre Completo</Text>
        <Text style={styles.value}>{user?.name || "Cargando..."}</Text>

        <Text style={styles.label}>Número de Control</Text>
        <Text style={styles.value}>{user?.controlNumber || "Cargando..."}</Text>

        <Text style={styles.label}>Nivel de Acceso</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{user?.role || "Cargando..."}</Text>
        </View>
      </View>

      {/* Botón de Salir */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#121212",
    padding: 20
  },
  header: { 
    marginBottom: 30,
    marginTop: 20,
    alignItems: "center"
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#fff" 
  },
  card: { 
    backgroundColor: "#1e1e1e", 
    borderRadius: 12, 
    padding: 24, 
    borderWidth: 1, 
    borderColor: "#333",
    marginBottom: 40
  },
  label: { 
    fontSize: 14, 
    color: "#a0a0a0", 
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  value: { 
    fontSize: 18, 
    color: "#fff", 
    marginBottom: 20,
    fontWeight: "500"
  },
  roleBadge: {
    backgroundColor: "#4da6ff20", // Azul translúcido
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#4da6ff"
  },
  roleText: {
    color: "#4da6ff",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 1
  },
  logoutButton: { 
    backgroundColor: "#cc0000", 
    padding: 16, 
    borderRadius: 12, 
    alignItems: "center" 
  },
  logoutText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  }
});