import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { formatPhotoUri } from "../api/picsum";

export default function PhotoGrid({ photos, numColumns, onEndReached }) {
  const navigation = useNavigation();
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", {
              author: item.author,
              url: item.url,
            })
          }
        >
          <Image
            source={{
              width: size,
              height: size,
              uri: formatPhotoUri(item.id, densitySize, densitySize),
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
}
