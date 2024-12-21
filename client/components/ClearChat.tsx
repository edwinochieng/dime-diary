import { Modal, Pressable, Text, useColorScheme, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { styles } from "@/constants/style";
import { useChat } from "@/context/ChatContext";

export default function ClearChat() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { messages, clearChat } = useChat();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "light" ? "#333333" : "#F2F2F2";

  const handleStart = () => {
    clearChat();
    setIsModalVisible(false);
  };
  return (
    <>
      {messages.length > 0 && (
        <View>
          <Pressable onPress={() => setIsModalVisible(true)} className="pr-4">
            <AntDesign name="delete" size={24} color={iconColor} />
          </Pressable>
          <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View className="flex-1 bg-white dark:bg-black bg-opacity-50 justify-center items-center">
              <View className="w-4/5 min-h-[100px] bg-[#F9F9F9] dark:bg-[#1A191E] rounded-xl py-5 px-6">
                <Text className={styles.boldText}>
                  Are you sure you want to restart the chat?
                </Text>

                <View className="mt-4 ">
                  <View className="">
                    <Pressable onPress={() => setIsModalVisible(false)}>
                      <Text className="text-white text-center text-lg">
                        Cancel
                      </Text>
                    </Pressable>
                  </View>
                  <View className="mt-2 ">
                    <Pressable onPress={handleStart}>
                      <Text className="text-red-500 text-center text-lg">
                        Restart
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
}
