import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useFavouriteStore } from "../zustand/store";
import { useState } from "react";

export default function Details({ route, navigation }) {
  const addFavourite = useFavouriteStore((state) => state.addFavourite);
  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);
  const [likeStatus, setLikeStatus] = useState(
    route.params.item.favourited || false
  );

  const onPress = (url) =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });

  const onButtonPress = () => {
    likeStatus
      ? removeFavourite(route.params.item)
      : addFavourite(route.params.item);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.detailsHeader}>Author: </Text>
        <Text style={styles.detailsBody}> {route.params.item.author}</Text>
      </View>

      <TouchableOpacity
        style={styles.box}
        onPress={() => onPress(route.params.item.url)}
      >
        <Text style={{ fontSize: 15 }}>See photo on Unsplash</Text>
        <EvilIcons name="external-link" size={24} color="black" />
      </TouchableOpacity>
      <Button
        title={
          likeStatus ? "remove it from favourites" : "add it to favourites"
        }
        onPress={onButtonPress}
      />
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
