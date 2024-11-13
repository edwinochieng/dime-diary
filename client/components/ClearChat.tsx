import { Pressable, useColorScheme } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ClearChat() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "light" ? "#333333" : "#F2F2F2";

  const handleStart = () => {};
  return (
    <Pressable onPress={handleStart} className="pr-4">
      <AntDesign name="delete" size={24} color={iconColor} />
    </Pressable>
  );
}
