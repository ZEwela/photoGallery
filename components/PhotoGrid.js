import React from "react";
import { Dimensions, FlatList, PixelRatio } from "react-native";
import PhotoBox from "./PhotoBox";

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
        <PhotoBox photo={item} size={size} densitySize={densitySize} />
      )}
    />
  );
}
