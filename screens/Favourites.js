import { Text, View } from "react-native";
import PhotoGrid from "../components/PhotoGrid";
import { useFavouriteStore } from "../zustand/store";
import { useEffect } from "react";

export default function Favourites() {
  const { favourites } = useFavouriteStore((state) => ({
    favourites: state.favourites,
  }));
  const fetchFavourites = useFavouriteStore((state) => state.fetchFavourites);

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <View>
      <PhotoGrid
        numColumns={3}
        photos={favourites}
        // onEndReached={fetchPhotos}
      />
    </View>
  );
}
