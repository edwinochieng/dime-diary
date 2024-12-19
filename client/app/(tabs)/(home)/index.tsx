import FloatingButton from "@/components/FloatingButton";
import LoadingScreen from "@/components/LoadingScreen";
import Overview from "@/components/Overview";
import RecentTransactions from "@/components/RecentTransactions";
import { styles } from "@/constants/style";
import { useTransactions } from "@/hooks/useTransactions";
import { SafeAreaView, Text, View } from "react-native";

export default function Home() {
  const { data, isLoading } = useTransactions();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className={styles.screen}>
      <View className="flex-1">
        {data && data.length > 0 ? (
          <View className="flex-1">
            <Overview transactions={data} />
            <RecentTransactions transactions={data} />
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className={styles.boldText}>Add your first transaction!</Text>
          </View>
        )}
      </View>
      <FloatingButton />
    </SafeAreaView>
  );
}
