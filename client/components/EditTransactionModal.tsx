import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { styles } from "@/constants/style";
import CategoryPicker from "./CategoryPicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "@/services/transaction";
import DatePicker from "./DatePicker";
import { Transaction } from "@/types/transaction";

interface Props {
  transactionId: string;
  transaction: Transaction;
  visible: boolean;
  onClose: () => void;
}

export default function EditTransactionModal({
  transactionId,
  transaction,
  visible,
  onClose,
}: Props) {
  const [activeTab, setActiveTab] = useState(transaction.type);
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(new Date(transaction.date));
  const [note, setNote] = useState(transaction.note!);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await updateTransaction(transactionId, {
        type: activeTab,
        title,
        amount: parseFloat(amount),
        category,
        date: date.toISOString(),
        note,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({
        queryKey: ["transactionDetails", transactionId],
      });
      onClose();
    },
    onError: (error) => {
      console.error("Error creating transaction:", error);
    },
  });

  const handleEditTransaction = () => {
    if (!title || !amount || !category || isNaN(parseFloat(amount))) {
      return;
    }
    mutate();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className={styles.modalContainer}>
        {/* Tab Switch */}
        <View className="my-3 flex-row rounded-xl p-1 bg-gray-200 dark:bg-transparent dark:border border-gray-500">
          <TouchableOpacity
            className={activeTab === "Income" ? styles.activeTab : styles.tab}
            onPress={() => setActiveTab("Income")}
          >
            <Text className={styles.tabText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={activeTab === "Expense" ? styles.activeTab : styles.tab}
            onPress={() => setActiveTab("Expense")}
          >
            <Text className={styles.tabText}>Expense</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 mt-8">
          <View className="flex-1">
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              className={styles.inputContainer}
            />
            <TextInput
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              className={styles.inputContainer}
            />

            <CategoryPicker
              activeTab={activeTab}
              category={category}
              setCategory={setCategory}
            />

            <DatePicker date={date} setDate={setDate} placeholder="Date" />

            <TextInput
              placeholder="Note"
              value={note}
              onChangeText={setNote}
              className={styles.inputContainer}
            />
          </View>
          <TouchableOpacity
            className={styles.button}
            onPress={handleEditTransaction}
          >
            <Text className={styles.buttonText}>Edit Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
