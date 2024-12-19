import { View, Text, FlatList } from "react-native";
import React from "react";
import { styles } from "@/constants/style";
import { Link } from "expo-router";
import { Transaction } from "@/types/transaction";
import {
  formatTransactionDate,
  getLastTenTransactions,
} from "@/utils/transactionUtils";

interface Props {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
  const recentTransactions = getLastTenTransactions(transactions);
  console.log("RecentTransactions:", recentTransactions);

  const renderItem = ({ item }: { item: Transaction }) => (
    <Link
      href={{ pathname: "/transaction/[id]", params: { id: item.id } }}
      className={`${styles.card} mb-2`}
    >
      <View className="flex-1 flex-col ">
        <View className="w-full flex-row justify-between">
          <Text className={styles.boldText}>{item.title}</Text>
          <Text
            className={`${
              item.type === "Income" ? "text-[#6FCF97]" : "text-[#EB5757]"
            } text-[18px] font-semibold`}
          >
            {item.type === "Income"
              ? `+$${item.amount.toFixed(2)}`
              : `-$${item.amount.toFixed(2)}`}
          </Text>
        </View>
        <View className="mt-3 w-full flex-row justify-between">
          <Text className={styles.subText}>{item.type}</Text>
          <Text className={styles.subText}>
            {formatTransactionDate(item.date)}
          </Text>
        </View>
      </View>
    </Link>
  );

  return (
    <View className="flex-1">
      <Text className={`${styles.boldText} tracking-wide my-8`}>
        Recent Transactions
      </Text>
      <View className="flex-1">
        <FlatList
          data={recentTransactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
