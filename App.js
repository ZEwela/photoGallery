import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import RootNavigator from "./navigation/RootNavigation";

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </RootSiblingParent>
  );
}
