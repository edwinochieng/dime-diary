import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "@/services/transaction";
import { Transaction } from "@/types/transaction";

export const useTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });
};
