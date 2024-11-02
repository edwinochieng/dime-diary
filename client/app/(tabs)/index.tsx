import FloatingButton from "@/components/FloatingButton";
import Overview from "@/components/Overview";
import RecentTransactions from "@/components/RecentTransactions";
import { styles } from "@/constants/style";
import { SafeAreaView, View } from "react-native";

export default function Home() {
  return (
    <SafeAreaView className={styles.screen}>
      <View className="flex-1">
        <Overview />
        <RecentTransactions />
      </View>
      <FloatingButton />
    </SafeAreaView>
  );
}
