import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <view style={styles.container}>
      <text style={styles.title}>Panel principal del club</text>
    </view>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
