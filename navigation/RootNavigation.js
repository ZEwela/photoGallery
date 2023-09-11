import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Gallery from "../screens/Gallery";
import Details from "../screens/Details";
import Favourites from "../screens/Favourites";
import TabNavigator from "./TabNavigator";

export default function RootNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: true, gestureDirection: "horizontal" }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{ title: "My gallery" }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen name="Favourites" component={Favourites} />
    </Stack.Navigator>
  );
}
