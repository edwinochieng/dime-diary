import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import EditTransactionModal from "./EditTransactionModal";
import { Transaction } from "@/types/transaction";

export default function EditTransactionButton({
  transactionId,
  transaction,
}: {
  transactionId: string;
  transaction: Transaction;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View className="flex-1">
      <View className="z-50 absolute right-2 bottom-24 ">
        <Pressable
          className="rounded-full bg-[#006AF6] justify-center items-center dark:bg-[#4B99FF] "
          onPress={() => setIsModalVisible(true)}
        >
          <View className="flex-row items-center px-6 py-3">
            <Feather name="edit-2" size={20} color="#F2F2F2" />
            <Text className="ml-2 uppercase font-semibold text-[16px] text-[#F2F2F2]">
              Edit
            </Text>
          </View>
        </Pressable>
      </View>

      <EditTransactionModal
        transactionId={transactionId}
        transaction={transaction}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}
