import { Image, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { formatPhotoUri } from "../api/picsum";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useFavouriteStore } from "../zustand/store";

export default function PhotoBox({ photo, size, densitySize }) {
  const addFavourite = useFavouriteStore((state) => state.addFavourite);
  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);
  const [like, setLike] = useState(photo.favourited || false);

  const handlePress = () => {
    setLike(!like);

    if (!like) {
      addFavourite(photo);
    } else {
      removeFavourite(photo);
    }
  };

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
          item: photo,
        })
      }
      style={{ position: "relative" }}
    >
      <Image
        source={{
          width: size,
          height: size,
          uri: formatPhotoUri(photo.id, densitySize, densitySize),
        }}
      />
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          {
            position: "absolute",
            bottom: pressed ? 3 : 2,
            right: 2,
          },
        ]}
      >
        <MaterialIcons
          name="favorite"
          size={20}
          color={photo.favourited || like ? "red" : "white"}
        />
      </Pressable>
    </TouchableOpacity>
  );
}
