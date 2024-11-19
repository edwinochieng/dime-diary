import { useSession } from "@/context/AuthContext";
import { registerUser } from "@/services/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signin } = useSession();

  const router = useRouter();

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }
    await registerUser(name, email, password);
    await signin(email, password);
    router.replace("/");
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-8 text-center">
        Create Account
      </Text>

      <TextInput
        placeholder="Name"
        className="border border-gray-300 p-3 rounded-lg mb-4"
        onChangeText={(text) => setName(text)}
        value={name}
      />
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
        onPress={handleSignUp}
        className="bg-blue-500 py-3 rounded-lg mb-6"
      >
        <Text className="text-white text-center font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-blue-500 ml-2 font-semibold">Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
