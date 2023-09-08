import { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { loadData } from "../utilis/asyncStorage";
import { cleanExpiredData } from "../utilis/asyncStorageClean";
import PhotoGrid from "../components/PhotoGrid";
import { useFavouriteStore } from "../zustand/store";
import Toast from "react-native-root-toast";

export default function Gallery() {
  const updatePage = useFavouriteStore((state) => state.updatePage);
  const fetchingPhotos = useFavouriteStore((state) => state.fetchingPhotos);
  const { nextPage, photos } = useFavouriteStore((state) => {
    return { nextPage: state.nextPage, photos: state.photos };
  });

  const fetchPhotos = useCallback(
    async (data) => {
      let toast = Toast.show("loading more photos...", {
        duration: 1000,
        position: Toast.positions.SHORT,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      if (!data) {
        fetchingPhotos();
      } else {
        fetchingPhotos(data);
      }
    },
    [nextPage]
  );

  useEffect(() => {
    const loadPhotos = async () => {
      await cleanExpiredData();
      const persistedPhotos = await loadData("photos");
      const persistedNextPage = await loadData("nextPage");

      if (persistedPhotos && persistedPhotos.length) {
        updatePage(persistedNextPage);
        fetchPhotos(persistedPhotos);
      } else {
        fetchPhotos();
      }
    };

    loadPhotos();
  }, []);

  if (photos.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <PhotoGrid
      numColumns={3}
      photos={photos}
      onEndReached={() => fetchPhotos()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
