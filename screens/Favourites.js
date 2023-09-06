import { Text, View } from "react-native";
import PhotoGrid from "../components/PhotoGrid";
import { useFavouriteStore } from "../zustand/store";

export default function Favourites() {
  const { favourites } = useFavouriteStore((state) => {
    return { favourites: state.favourites };
  });

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
