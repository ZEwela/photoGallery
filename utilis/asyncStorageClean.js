import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveData } from "./asyncStorage";

// Define a key for storing the last data cleaning timestamp
const LAST_CLEANING_TIMESTAMP_KEY = "lastDataCleaningTimestamp";

// Define the data expiry period in milliseconds (e.g., 7 days)
const DATA_EXPIRY_PERIOD = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export async function cleanExpiredData() {
  try {
    // Get the current timestamp
    const currentTimestamp = Date.now();

    // Get the last cleaning timestamp from AsyncStorage
    const lastCleaningTimestamp = await AsyncStorage.getItem(
      LAST_CLEANING_TIMESTAMP_KEY
    );

    // If there's no last cleaning timestamp or it's been more than the expiry period
    if (
      !lastCleaningTimestamp ||
      currentTimestamp - parseInt(lastCleaningTimestamp) >= DATA_EXPIRY_PERIOD
    ) {
      // Implement your data cleaning logic here
      // For example, remove data that has expired
      await saveData("photos", []);
      await saveData("nextPage", 1);

      // Set the current timestamp as the last cleaning timestamp
      await AsyncStorage.setItem(
        LAST_CLEANING_TIMESTAMP_KEY,
        currentTimestamp.toString()
      );
    }
  } catch (error) {
    console.error("Error cleaning data:", error);
  }
}
