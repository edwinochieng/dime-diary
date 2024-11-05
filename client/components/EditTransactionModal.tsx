import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { styles } from "@/constants/style";
import CategoryPicker from "./CategoryPicker";

export default function EditTransactionModal({ visible, onClose }: any) {
  const [activeTab, setActiveTab] = useState("Income");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [note, setNote] = useState("");

  const handleEditTransaction = () => {
    console.log({
      type: activeTab,
      title,
      amount,
      category,
      date,
      note,
    });
    onClose();
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

            <TextInput
              placeholder="Date"
              value={date}
              onChangeText={setDate}
              className={styles.inputContainer}
            />

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
