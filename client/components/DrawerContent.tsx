import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { styles } from "@/constants/style";

export default function DrawerContent(props: any) {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <DrawerContentScrollView {...props}>
      <View className="flex-1">
        <Text className="text-lg font-bold">John Doe</Text>
        <Text className="text-gray-500">john.doe@example.com</Text>
      </View>

      {/* Logout Button */}
      <View className="">
        <TouchableOpacity onPress={handleLogout} className={styles.button}>
          <Text className={styles.boldText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
