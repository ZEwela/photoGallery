import { create } from "zustand";
import { getList } from "../api/picsum";
import { loadData, saveData } from "../utilis/asyncStorage";

export const useFavouriteStore = create((set, get) => ({
  photos: [],
  favourites: [],
  nextPage: 1,
  loadingFavourites: true,
  fetchFavourites: async () => {
    const asyncStorageFavourites = await loadData("favourites");
    set((state) => ({ ...state, loadingFavourites: false }));
    if (asyncStorageFavourites && asyncStorageFavourites.length) {
      set((state) => ({ ...state, favourites: [...asyncStorageFavourites] }));
    }
  },
  addFavourite: async (photo) => {
    photo.favourited = true;

    set((state) => ({ ...state, favourites: [...state.favourites, photo] }));

    await saveData("favourites", [...get().favourites]);
    await saveData("photos", [...get().photos]);
  },
  removeFavourite: async (photo) => {
    const newFavourites = get().favourites.filter(
      (favPhoto) => favPhoto.id !== photo.id
    );

    const toUp = get().photos.find((p) => p.id === photo.id);
    toUp.favourited = false;

    await saveData("favourites", [...newFavourites]);
    await saveData("photos", [...get().photos]);
    // Set data (favourites) to  AsyncStorage and store
    set((state) => ({
      ...state,
      favourites: [...newFavourites],
      photos: [...state.photos],
    }));
  },
  fetchingPhotos: async (data) => {
    if (!data) {
      const nextPhotos = await getList(get().nextPage);
      // Save data (photos, nextPage) to AsyncStorage
      await saveData("photos", [...get().photos]);
      await saveData("nextPage", get().nextPage);

      // Set data (photos, nextPage) to store
      set((state) => ({
        ...state,
        photos: [...state.photos, ...nextPhotos],
        nextPage: state.nextPage + 1,
      }));
    } else {
      // Set peristed data (photos) to store and AsyncStorage
      await saveData("photos", [...data]),
        set((state) => ({ ...state, photos: [...data] }));
    }
  },
  updatePage: async (page) => {
    // Set data (nextPage) to store and AsyncStorage
    await saveData("nextPage", get().nextPage),
      set((state) => {
        return {
          ...state,
          nextPage: page,
        };
      });
  },
}));
