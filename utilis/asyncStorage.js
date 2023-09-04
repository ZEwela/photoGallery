import AsyncStorage from "@react-native-async-storage/async-storage";
export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving data: ", e);
  }
};

export const loadData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error loading data: ", e);
  }

  return null;
};
