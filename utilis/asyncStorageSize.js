export async function calculateAsyncStorageSize() {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    let totalSize = 0;

    for (const key of allKeys) {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        // Calculate the size of the key-value pair
        const pairSize = key.length + JSON.stringify(value).length;

        // Add the size to the total
        totalSize += pairSize;
      }
    }

    // Convert the total size to a human-readable format (e.g., KB or MB)
    const formattedSize = bytesToSize(totalSize);

    console.log(`Total AsyncStorage Size: ${formattedSize}`);
  } catch (error) {
    console.error("Error calculating AsyncStorage size:", error);
  }
}

// Function to convert bytes to a human-readable format (e.g., KB or MB)
function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

// Call the function to calculate the size
//   console.log(calculateAsyncStorageSize());
