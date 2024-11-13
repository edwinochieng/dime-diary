import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { styles } from "@/constants/style";
import Feather from "@expo/vector-icons/Feather";

export default function DrawerContent(props: any) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "light" ? "#333333" : "#F2F2F2";
  const router = useRouter();

  const handleLogout = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    router.push("/login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View className="flex-1 h-full p-4">
        <View className="mt-5 flex-1 py-6 border border-t-transparent border-x-transparent border-b-[#000000] dark:border-b-[#F2F2F2]">
          <Text className="text-[24px] font-semibold text-[#000000] dark:text-[#F2F2F2]">
            Hello, Edwin!
          </Text>
        </View>

        <View className="mt-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center"
          >
            <Feather name="log-out" size={22} color={iconColor} />
            <Text className="ml-2 text-[20px] font-medium text-[#000000] dark:text-[#F2F2F2]">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
