import Message from "@/components/Message";
import PromptInput from "@/components/PromptInput";
import { styles } from "@/constants/style";
import { generateResponse } from "@/services/chat";
import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

const initialMessages = [
  { sender: "Bot", content: "Hello, how can I help you?" },
];

export default function Chats() {
  const [messages, setMessages] = useState(initialMessages);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendMessage = async (userPrompt: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", content: userPrompt },
    ]);

    setIsGenerating(true);
    const botResponse = await generateResponse(userPrompt);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", content: botResponse },
      ]);
      setIsGenerating(false);
    }, 2000);
  };
  return (
    <SafeAreaView className={styles.screen}>
      <ScrollView className="flex-1">
        <View className="">
          {messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </View>
        {isGenerating && (
          <View className="flex justify-start mt-2">
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        )}
      </ScrollView>
      <PromptInput
        onSendMessage={handleSendMessage}
        isGenerating={isGenerating}
      />
    </SafeAreaView>
  );
}
