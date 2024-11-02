import { styles } from "@/constants/style";
import { Text, SafeAreaView } from "react-native";

export default function Chats() {
  return (
    <SafeAreaView className={styles.screen}>
      <Text className="text-red-500 text-2xl">Chats page!</Text>
    </SafeAreaView>
  );
}
