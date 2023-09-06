import { create } from "zustand";
import { getList } from "../api/picsum";
import { saveData } from "../utilis/asyncStorage";

export const useFavouriteStore = create((set, get) => ({
  photos: [],
  favourites: [],
  nextPage: 1,
  addFavourite: (photo) => {
    set((state) => {
      const isDuplicate = state.favourites.some(
        (favPhoto) => favPhoto.id === photo.id
      );
      if (!isDuplicate) {
        photo.favourited = true;
        return { favourites: [...state.favourites, photo] };
      }
      return state.favourites;
    });
  },
  removeFavourite: (photo) => {
    photo.favourited = false;
    const newFavourites = state.favourites.filter(
      (favPhoto) => favPhoto.id !== photo.id
    );
    set((state) => {
      return { favourites: [...newFavourites] };
    });
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
