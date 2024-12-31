import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import Markdown from "react-native-markdown-display";

export default function Message({ message }: any) {
  const colorScheme = useColorScheme();
  const bodyColor = colorScheme === "light" ? "#000000" : "#F2F2F2";

  const styles = StyleSheet.create({
    body: {
      fontSize: 17,
      color: bodyColor,
    },
  });

  return (
    <View className="mb-4">
      <View
        className={`flex-row ${
          message.sender === "You" ? "justify-end" : "justify-start"
        }`}
      >
        <View
          className={` px-3.5 py-2 rounded-2xl shadow-xl ${
            message.sender === "You"
              ? "bg-[#006AF6] dark:bg-[#4B99FF] max-w-[75%]"
              : "bg-white dark:bg-[#1A191E] max-w-full"
          }`}
        >
          {message.sender === "You" ? (
            <Text
              className="font-normal text-[17px]  
                text-[#F2F2F2]"
            >
              {message.content}
            </Text>
          ) : (
            <Markdown style={styles}>{message.content}</Markdown>
          )}
        </View>
      </View>
    </View>
  );
}
