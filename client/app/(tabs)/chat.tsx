import Message from "@/components/Message";
import PromptInput from "@/components/PromptInput";
import { styles } from "@/constants/style";
import { useChat } from "@/context/ChatContext";
import { generateResponse } from "@/services/chat";

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Chats() {
  const { messages, addToChat, generatingResponse, setGeneratingResponse } =
    useChat();

  const handleSendMessage = async (userPrompt: string) => {
    const userMessage = {
      sender: "You",
      content: userPrompt,
    };
    addToChat(userMessage);

    setGeneratingResponse(true);
    const botResponse = await generateResponse(userPrompt);
    setGeneratingResponse(false);

    const botMessage = {
      sender: "Bot",
      content: botResponse,
    };
    addToChat(botMessage);
  };
  return (
    <SafeAreaView className={styles.screen}>
      {messages.length > 0 ? (
        <ScrollView className="flex-1">
          <View className="">
            {messages.map((message, index) => (
              <Message message={message} key={index} />
            ))}
          </View>
          {generatingResponse && (
            <View className="flex justify-start mt-2">
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          )}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className={styles.boldText}>How can I help you today?</Text>
        </View>
      )}

      <PromptInput onSendMessage={handleSendMessage} />
    </SafeAreaView>
  );
}
