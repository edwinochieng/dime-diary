import { View, Text, Pressable, Modal, FlatList } from "react-native";
import React, { useState } from "react";
import { styles } from "@/constants/style";

const incomeCategories = ["Salary", "Freelance", "Investment"];
const expenseCategories = ["Food", "Transport", "Utilities"];

export default function CategoryPicker({
  activeTab,
  category,
  setCategory,
}: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const options = activeTab === "Income" ? incomeCategories : expenseCategories;
  const handleOptionSelect = (item: string) => {
    setCategory(item);
    setIsModalVisible(false);
  };
  return (
    <View>
      <Pressable
        className={styles.inputContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Text className={styles.inputText}>
          {category !== "" ? category : "Tag"}
        </Text>
      </Pressable>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-white dark:bg-black bg-opacity-50 justify-center items-center">
          <View className="w-4/5 bg-[#F9F9F9] dark:bg-[#1A191E] rounded-xl py-4 px-6">
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  className="py-3 "
                  onPress={() => handleOptionSelect(item)}
                >
                  <Text className={styles.inputText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
