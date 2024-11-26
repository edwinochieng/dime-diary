import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useChat } from "@/context/ChatContext";

export default function PromptInput({ onSendMessage }: any) {
  const [userPrompt, setUserPrompt] = useState("");
  const { generatingResponse } = useChat();

  const handleSend = () => {
    if (userPrompt.trim()) {
      onSendMessage(userPrompt);
      setUserPrompt("");
    }
  };

  return (
    <View className="py-2">
      <View className="flex-row items-center  py-1">
        <TextInput
          className="flex-1 px-6  mr-2 h-12 text-[16px] font-normal text-[#F2F2F2] rounded-full  bg-[#FFFFFF] dark:bg-[#1A191E] dark:placeholder:text-gray-400"
          placeholder="Enter prompt"
          value={userPrompt}
          onChangeText={setUserPrompt}
          editable={!generatingResponse}
        />
        <Pressable
          onPress={handleSend}
          disabled={generatingResponse || !userPrompt.trim()}
          className="bg-[#006AF6]  rounded-full h-12 w-12 items-center justify-center"
        >
          <FontAwesome name="send" size={20} color="#F2F2F2" />
        </Pressable>
      </View>
    </View>
  );
}
