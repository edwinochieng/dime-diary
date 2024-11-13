import { Pressable, useColorScheme } from "react-native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MenuButton() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "light" ? "#333333" : "#F2F2F2";

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Pressable onPress={openDrawer} className="ml-4">
      <Ionicons name="menu-outline" size={28} color={iconColor} />
    </Pressable>
  );
}
