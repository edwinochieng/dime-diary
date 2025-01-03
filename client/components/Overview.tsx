import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "@/constants/style";
import { Transaction } from "@/types/transaction";

interface Props {
  transactions: Transaction[];
}

export default function Overview({ transactions }: Props) {
  const incomeTotal =
    transactions
      ?.filter((tx) => tx.type === "Income")
      .reduce((sum, tx) => sum + tx.amount, 0) ?? 0;

  const expenseTotal =
    transactions
      ?.filter((tx) => tx.type === "Expense")
      .reduce((sum, tx) => sum + tx.amount, 0) ?? 0;

  const totalAmount = incomeTotal - expenseTotal;
  return (
    <View>
      {/**Total balance */}
      <View className={styles.card}>
        <View className="py-4">
          <Text className={styles.subheading}>Total Balance</Text>
          <Text className={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <View className="mt-3 flex-row ">
        <View className={`${styles.card} mr-1.5 flex-1`}>
          <View className="mb-2 rounded-full bg-green-900/15 h-8 w-8 flex justify-center items-center">
            <Ionicons name="trending-up" size={17} color="#6FCF97" />
          </View>
          <View>
            <Text className={styles.subheading}>Total income</Text>
            <Text className={styles.amount}>+ ${incomeTotal.toFixed(2)}</Text>
          </View>
        </View>
        <View className={`${styles.card} ml-1.5 flex-1`}>
          <View className="mb-2 rounded-full bg-red-900/15 h-8 w-8 flex justify-center items-center">
            <Ionicons name="trending-down" size={17} color="#EB5757" />
          </View>
          <View>
            <Text className={styles.subheading}>Total expense</Text>
            <Text className={styles.amount}>- ${expenseTotal.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
