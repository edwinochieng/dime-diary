import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { styles } from "@/constants/style";
import { Link, useRouter } from "expo-router";
import { Transaction } from "@/types/transaction";

interface Props {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
  const recents = [
    {
      id: 1,
      title: "Groceries",
      amount: 50,
      date: "2023-10-10",
      type: "Expense",
    },
    {
      id: 2,
      title: "Freelance",
      amount: 150,
      date: "2023-10-09",
      type: "Income",
    },
    {
      id: 3,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 13,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 4,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 5,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 6,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 7,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 8,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 9,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 10,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 11,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
    {
      id: 12,
      title: "Transport",
      amount: 20,
      date: "2023-10-08",
      type: "Expense",
    },
  ];
  const recentTransactions = recents.slice(0, 10);

  const renderItem = ({ item }: any) => (
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
            {item.type === "Income" ? `+$${item.amount}` : `-$${item.amount}`}
          </Text>
        </View>
        <View className="mt-3 w-full flex-row justify-between">
          <Text className={styles.subText}>{item.type}</Text>
          <Text className={styles.subText}>{item.date}</Text>
        </View>
      </View>
    </Link>
  );

  return (
    <View className="flex-1 ">
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
