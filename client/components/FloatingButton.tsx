import { View, Pressable } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import NewTransactionModal from "./NewTransactionModal";

export default function FloatingButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <Pressable
        className="z-50 absolute right-2 bottom-10 rounded-full bg-[#006AF6] h-[56px] w-[56px] justify-center items-center dark:bg-[#4B99FF] "
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="#F2F2F2" />
      </Pressable>
      <NewTransactionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}
