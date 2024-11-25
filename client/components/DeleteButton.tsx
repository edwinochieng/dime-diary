import { Modal, Pressable, Text, useColorScheme, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "@/services/transaction";
import { styles } from "@/constants/style";
import { useRouter } from "expo-router";

export default function DeleteButton({
  transactionId,
}: {
  transactionId: string;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "light" ? "#333333" : "#F2F2F2";

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTransaction(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  const handleDelete = () => {
    mutate();
    router.push("/");
  };
  return (
    <View>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <AntDesign name="delete" size={24} color={iconColor} />
      </Pressable>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-white dark:bg-black bg-opacity-50 justify-center items-center">
          <View className="w-4/5 bg-[#F9F9F9] dark:bg-[#1A191E] rounded-xl py-4 px-6">
            <Text className={styles.boldText}>
              Are you sure you want to delete this transaction?
            </Text>
            <View className="flex-1 flex-row space-x-3">
              <View>
                <Pressable className="text-white">Cancel</Pressable>
              </View>
              <View>
                <Pressable className="text-red-500" onPress={handleDelete}>
                  Delete
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
