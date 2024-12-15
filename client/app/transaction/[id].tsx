import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { styles } from "@/constants/style";
import DeleteButton from "@/components/DeleteButton";
import EditTransactionButton from "@/components/EditTransactionButton";
import { useQuery } from "@tanstack/react-query";
import { getTransactionDetails } from "@/services/transaction";
import { Transaction } from "@/types/transaction";
import LoadingScreen from "@/components/LoadingScreen";
import { formatTransactionDate } from "@/utils/transactionUtils";

export default function TransactionDetails() {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const transactionId = id.toString();
  const { data, isLoading } = useQuery<Transaction>({
    queryKey: ["transactionDetails", transactionId],
    queryFn: () => getTransactionDetails(transactionId),
    enabled: !!transactionId,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="flex-1 p-4 relative">
      <Stack.Screen
        options={{
          headerRight: () => <DeleteButton transactionId={transactionId} />,
          headerBackVisible: true,
          title: "Transaction Details",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colorScheme === "light" ? "#000000" : "#F2F2F2",
            fontWeight: 600,
            fontSize: 20,
          },
        }}
      />
      <ScrollView className="flex-1 mt-12">
        <View>
          <Text className={styles.label}>Title</Text>
          <Text className={styles.description}>{data?.title}</Text>
        </View>
        <View>
          <Text className={styles.label}>Amount</Text>
          <Text className={styles.description}>${data?.amount.toFixed(2)}</Text>
        </View>
        <View>
          <Text className={styles.label}>Type</Text>
          <Text className={styles.description}>{data?.transaction_type}</Text>
        </View>
        <View>
          <Text className={styles.label}>Tag</Text>
          <Text className={styles.description}>{data?.category}</Text>
        </View>
        <View>
          <Text className={styles.label}>Date</Text>
          <Text className={styles.description}>
            {formatTransactionDate(data!.date)}
          </Text>
        </View>
        {data?.note && (
          <View>
            <Text className={styles.label}>Note</Text>
            <Text className={styles.description}>{data?.note}</Text>
          </View>
        )}
      </ScrollView>
      <EditTransactionButton transactionId={transactionId} />
    </SafeAreaView>
  );
}
