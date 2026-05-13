import React, { useState, useEffect, useContext } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl,
  Alert
} from "react-native";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import AddEventModal from "../components/AddEventModal";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "PRESIDENTE" || user?.role === "MESA";
  
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filtro, setFiltro] = useState("NOTICIA"); 

  // Estados del Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("NOTICIA");
  const [fecha, setFecha] = useState("");
  const [permitirReg, setPermitirReg] = useState(false);
  const [capacidad, setCapacidad] = useState("");

  const fetchPublicaciones = async () => {
    try {
      const response = await api.get("/publications"); 
      
      // Opcional: Ordenar para que las más nuevas (dateCreation) salgan hasta arriba
      const ordenadas = response.data.sort((a, b) => {
        if (!a.dateCreation || !b.dateCreation) return 0;
        return new Date(b.dateCreation) - new Date(a.dateCreation);
      });

      setPublicaciones(ordenadas);
    } catch (error) {
      console.error("Error al cargar publicaciones:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const publicacionesFiltradas = publicaciones.filter(pub => pub.type === filtro);

  const handleGuardarPublicacion = async () => {
    if (!titulo || !descripcion) {
      Alert.alert("Campos vacíos", "El título y la descripción son obligatorios.");
      return;
    }

    // AJUSTE: Mapeamos exactamente a los nombres de tu base de datos
    const nuevaPublicacion = {
      tittle: titulo, // <-- ¡Con doble T!
      description: descripcion, // <-- En lugar de content
      type: tipo,
      eventDate: fecha,
      doInscription: permitirReg, // <-- Tu booleano de inscripción
      capacity: permitirReg && capacidad ? parseInt(capacidad) : 0, // <-- Capacidad numérica
      numControlAutor: user?.controlNumber // <-- ¡Guardamos automáticamente quién lo publicó!
    };

    try {
      await api.post("/publications", nuevaPublicacion);
      Alert.alert("¡Éxito!", "La publicación ha sido creada.");
      
      setTitulo("");
      setDescripcion("");
      setFecha("");
      setCapacidad("");
      setPermitirReg(false);
      setModalVisible(false);
      
      fetchPublicaciones();
    } catch (error) {
      console.error("Error al publicar:", error);
      Alert.alert("Error", "Hubo un problema al crear la publicación.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, filtro === "NOTICIA" && styles.activeTab]} onPress={() => setFiltro("NOTICIA")}>
          <Text style={[styles.tabText, filtro === "NOTICIA" && styles.activeTabText]}>Noticias</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.tab, filtro === "EVENTO" && styles.activeTab]} onPress={() => setFiltro("EVENTO")}>
          <Text style={[styles.tabText, filtro === "EVENTO" && styles.activeTabText]}>Eventos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={publicacionesFiltradas}
        keyExtractor={(item) => item.idPublication?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchPublicaciones(); }} tintColor="#4da6ff" />}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate("EventDetail", { evento: item })}
          >
            <Text style={styles.cardTitle}>{item.tittle}</Text> 
            <Text style={styles.cardContent}>{item.description}</Text>
            
            {item.eventDate ? (
                <View style={styles.eventDateContainer}>
                  <Text style={styles.eventDateText}>📅 Cuándo: {item.eventDate}</Text>
                </View>
            ) : null}

            {/* Opcional: Si quieres mostrar la capacidad si hay inscripciones */}
            {item.doInscription && (
                <Text style={{color: '#4da6ff', marginTop: 5}}>
                  👥 Cupo: {item.capacity} personas
                </Text>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay {filtro.toLowerCase()}s por el momento.</Text>}
      />

      {isAdmin && (
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      )}

      <AddEventModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleGuardarPublicacion}
        titleValue={titulo}
        onTitleChange={setTitulo}
        descriptionValue={descripcion}
        onDescriptionChange={setDescripcion}
        typeValue={tipo}
        onTypeChange={setTipo}
        dateValue={fecha}
        onDateChange={setFecha}
        allowReg={permitirReg}
        onAllowRegChange={setPermitirReg}
        capacityValue={capacidad}
        onCapacityChange={setCapacidad}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  centered: { justifyContent: "center", alignItems: "center" },
  tabContainer: { flexDirection: "row", backgroundColor: "#1a1a1a", borderBottomWidth: 1, borderBottomColor: "#333" },
  tab: { flex: 1, paddingVertical: 15, alignItems: "center" },
  activeTab: { borderBottomWidth: 3, borderBottomColor: "#4da6ff" },
  tabText: { color: "#888", fontSize: 16, fontWeight: "bold" },
  activeTabText: { color: "#4da6ff" },
  listContainer: { padding: 16, paddingBottom: 80 },
  card: { backgroundColor: "#1e1e1e", borderRadius: 12, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#333" },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  cardContent: { fontSize: 15, color: "#ccc", lineHeight: 22, marginBottom: 12 },
  eventDateContainer: { marginTop: 10, backgroundColor: "#252525", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#333" },
  eventDateText: { fontSize: 14, color: "#4da6ff", fontWeight: "bold" },
  emptyText: { color: "#888", textAlign: "center", marginTop: 50, fontSize: 16 },
  fab: { position: "absolute", width: 60, height: 60, alignItems: "center", justifyContent: "center", right: 20, bottom: 20, backgroundColor: "#4da6ff", borderRadius: 30, elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
  fabIcon: { fontSize: 30, color: "#fff", fontWeight: "bold", marginTop: -2 }
});