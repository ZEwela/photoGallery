import { useState } from "react";

export const usePersistedData = (key, initialValue, clean = false) => {
  // Use the initial value if data is not found in local storage
  if (clean) {
    cleanExpiredData();
  }
  const [data, setData] = useState(() => {
    const persistedData = loadData(key);
    return persistedData !== null ? persistedData : initialValue;
  });

  // Function to update and persist data
  const updateData = (newValue) => {
    setData(newValue);
    saveData(key, newValue);
  };

  return [data, updateData];
};
useEffect(() => {
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
