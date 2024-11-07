import { View, Text } from "react-native";
import React from "react";

export default function Message({ message }: any) {
  return (
    <View className="mb-4">
      <View
        className={`flex-row ${
          message.sender === "You" ? "justify-end" : "justify-start"
        }`}
      >
        <View
          className={`max-w-[75%] px-3.5 py-2 rounded-xl shadow-xl ${
            message.sender === "You"
              ? "bg-[#006AF6] dark:bg-[#4B99FF] "
              : "bg-white dark:bg-[#1A191E]"
          }`}
        >
          <Text
            className={`font-normal text-[17px]  ${
              message.sender === "You"
                ? "text-[#F2F2F2]"
                : "text-[#000000] dark:text-[#F2F2F2]"
            }`}
          >
            {message.content}
          </Text>
        </View>
      </View>
    </View>
  );
}
