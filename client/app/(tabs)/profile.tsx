import { styles } from "@/constants/style";
import { SafeAreaView, Text } from "react-native";

export default function Profile() {
  return (
    <SafeAreaView className={styles.screen}>
      <Text className="text-red-500 text-2xl">Profile page!</Text>
    </SafeAreaView>
  );
}
