import { useCallback, useEffect, useReducer } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { actionCreators, initialState, reducer } from "./reducers/photos";
import PhotoGrid from "./components/PhotoGrid";
import { getList } from "./api/picsum";
import { loadData, saveData } from "./utilis/asyncStorage";
import { cleanExpiredData } from "./utilis/asyncStorageClean";
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { photos, nextPage, loading, error } = state;

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading());

    try {
      const nextPhotos = await getList(nextPage);
      dispatch(actionCreators.success(nextPhotos, nextPage));
      await saveData("photos", [...photos, ...nextPhotos]);
      await saveData("nextPage", nextPage);
    } catch (e) {
      dispatch(actionCreators.failure());
    }
  }, [nextPage]);

  useEffect(() => {
    cleanExpiredData();
    const loadPersistedPhotos = async () => {
      const persistedPhotos = await loadData("photos");
      const persistedNextPage = await loadData("nextPage");

      if (persistedPhotos && persistedPhotos.length) {
        dispatch(actionCreators.updatePage(persistedNextPage));
        dispatch(actionCreators.success(persistedPhotos, nextPage));
      } else {
        fetchPhotos();
      }
    };
    loadPersistedPhotos();
  }, []);

  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      );
    }
  }
  return (
    <PhotoGrid numColumns={3} photos={photos} onEndReached={fetchPhotos} />
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
