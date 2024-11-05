import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { styles } from "@/constants/style";
import DeleteButton from "@/components/DeleteButton";
import EditTransactionButton from "@/components/EditTransactionButton";

export default function TransactionDetails() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView className="flex-1 p-4 relative">
      <Stack.Screen
        options={{
          headerRight: () => <DeleteButton />,
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
          <Text className={styles.description}>CashBack Offer</Text>
        </View>
        <View>
          <Text className={styles.label}>Amount</Text>
          <Text className={styles.description}>$30</Text>
        </View>
        <View>
          <Text className={styles.label}>Type</Text>
          <Text className={styles.description}>Income</Text>
        </View>
        <View>
          <Text className={styles.label}>Tag</Text>
          <Text className={styles.description}>Entertainment</Text>
        </View>
        <View>
          <Text className={styles.label}>Date</Text>
          <Text className={styles.description}>Sunday 18th December</Text>
        </View>
        <View>
          <Text className={styles.label}>Note</Text>
          <Text className={styles.description}>
            I got this from Payne for recharge
          </Text>
        </View>
      </ScrollView>
      <EditTransactionButton />
    </SafeAreaView>
  );
}
