import { loginUser } from "@/services/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignin = async () => {
    if (!email.trim() || !password.trim()) {
      return;
    }

    const res = await loginUser(email, password);
    if (res.success) {
      router.replace("/");
    }
  };
  return (
    <View className="flex-1 justify-center px-6">
      <Text className="text-gray-700 dark:text-gray-300 text-4xl text-center font-bold mb-12">
        Welcome back!
      </Text>

      <TextInput
        placeholder="Email"
        className="border border-gray-300 p-3 rounded-lg mb-4 dark:text-gray-300 dark:placeholder:text-gray-400"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        className="border border-gray-300 p-3 rounded-lg mb-4 dark:text-gray-300 dark:placeholder:text-gray-400"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleSignin}
        className="bg-blue-500 py-4 rounded-lg mt-2 mb-6"
      >
        <Text className="text-white text-xl text-center font-semibold">
          Login
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="dark:text-gray-200">Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text className="text-blue-500 ml-2 font-semibold">
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
