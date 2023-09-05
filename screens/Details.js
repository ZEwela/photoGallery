import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function Details({ route }) {
  const onPress = (url) =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.detailsHeader}>Author: </Text>
        <Text style={styles.detailsBody}> {route.params.author}</Text>
      </View>

      <TouchableOpacity
        style={styles.box}
        onPress={() => onPress(route.params.url)}
      >
        <Text style={{ fontSize: 15 }}>See photo on Unsplash</Text>
        <EvilIcons name="external-link" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 20,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  detailsBody: {
    fontSize: 20,
  },
});