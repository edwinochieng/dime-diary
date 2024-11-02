import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function NewTransactionModal({ visible, onClose }: any) {
  const [activeTab, setActiveTab] = useState("Income");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [note, setNote] = useState("");

  const incomeCategories = ["Salary", "Freelance", "Investment"];
  const expenseCategories = ["Food", "Transport", "Utilities"];

  const handleCreateTransaction = () => {
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
      <View style={styles.container}>
        {/* Tab Switch */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Income" && styles.activeTab]}
            onPress={() => setActiveTab("Income")}
          >
            <Text style={styles.tabText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Expense" && styles.activeTab]}
            onPress={() => setActiveTab("Expense")}
          >
            <Text style={styles.tabText}>Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Category Picker */}
        <Picker
          selectedValue={category}
          onValueChange={(itemValue: any) => setCategory(itemValue)}
          style={styles.picker}
        >
          {(activeTab === "Income" ? incomeCategories : expenseCategories).map(
            (cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            )
          )}
        </Picker>

        {/* Date */}
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
        />

        {/* Note */}
        <TextInput
          style={styles.input}
          placeholder="Note"
          value={note}
          onChangeText={setNote}
        />

        {/* Create Button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateTransaction}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "lightgray",
  },
  activeTab: {
    borderColor: "#6200ee",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
