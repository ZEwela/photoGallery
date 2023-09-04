import React from "react";
import { Dimensions, FlatList, Image, PixelRatio } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { formatPhotoUri } from "../api/picsum";

export default function PhotoGrid({ photos, numColumns, onEndReached }) {
  const { width } = Dimensions.get("window");
  const size = width / numColumns;
  const densitySize = PixelRatio.getPixelSizeForLayoutSize(size);

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id + Math.random()}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <Image
          source={{
            width: size,
            height: size,
            uri: formatPhotoUri(item.id, densitySize, densitySize),
          }}
        />
      )}
    />
  );
}
