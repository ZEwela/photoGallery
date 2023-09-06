import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Gallery from "../screens/Gallery";
import Favourites from "../screens/Favourites";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export default function TabNavigator() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Gallery") {
            return (
              <MaterialIcons
                name="photo-library"
                size={24}
                color={focused ? "green" : "gray"}
              />
            );
          } else if (route.name === "Favourites") {
            return (
              <AntDesign
                name="heart"
                size={24}
                color={focused ? "green" : "gray"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="Favourites" component={Favourites} />
    </Tab.Navigator>
  );
}
