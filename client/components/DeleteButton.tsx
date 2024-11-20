import { Pressable, useColorScheme } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "@/services/transaction";

export default function DeleteButton({
  transactionId,
}: {
  transactionId: string;
}) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "light" ? "#333333" : "#F2F2F2";

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTransaction(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  const handleDelete = () => {
    mutate();
  };
  return (
    <Pressable onPress={handleDelete}>
      <AntDesign name="delete" size={24} color={iconColor} />
    </Pressable>
  );
}
