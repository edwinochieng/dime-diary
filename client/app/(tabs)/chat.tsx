import { Text, View } from "react-native";

export default function Chats() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-500 text-2xl">Chats page!</Text>
    </View>
  );
}
