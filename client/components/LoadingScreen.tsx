import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/constants/style";

export default function LoadingScreen() {
  return (
    <SafeAreaView className={styles.screen}>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    </SafeAreaView>
  );
}
