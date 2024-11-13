import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-8 text-center">Login</Text>

      <TextInput
        placeholder="Email"
        className="border border-gray-300 p-3 rounded-lg mb-4"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        className="border border-gray-300 p-3 rounded-lg mb-6"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => {
          /* Add login logic here */
        }}
        className="bg-blue-500 py-3 rounded-lg mb-6"
      >
        <Text className="text-white text-center font-semibold">Login</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text className="text-blue-500 ml-2 font-semibold">
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
