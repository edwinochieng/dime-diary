import { Pressable, useColorScheme } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DeleteButton() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "light" ? "#333333" : "#F2F2F2";
  const handleDelete = () => {};

  return (
    <Pressable onPress={handleDelete}>
      <AntDesign name="delete" size={24} color={iconColor} />
    </Pressable>
  );
}
