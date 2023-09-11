import { ActivityIndicator, Text, View } from "react-native";
import PhotoGrid from "../components/PhotoGrid";
import { useFavouriteStore } from "../zustand/store";
import { useEffect } from "react";

export default function Favourites() {
  const { favourites, loading } = useFavouriteStore((state) => ({
    favourites: state.favourites,
    loading: state.loadingFavourites,
  }));
  const fetchFavourites = useFavouriteStore((state) => state.fetchFavourites);

  useEffect(() => {
    fetchFavourites();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} />
        <Text>Loading your favourites photos...</Text>
      </View>
    );
  }
  return (
    <View>
      <PhotoGrid numColumns={3} photos={favourites} />
    </View>
  );
}
