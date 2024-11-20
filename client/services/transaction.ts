import { NewTransaction, Transaction } from "@/types/transaction";
import API from "@/utils/api";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const res = await API.get("/transactions");
  return res.data;
};

export const getTransactionDetails = async (
  id: string
): Promise<Transaction> => {
  const res = await API.get(`/transactions/${id}`);
  return res.data;
};

export const deleteTransaction = async (id: string) => {
  return await API.delete(`/transactions/${id}`);
};

export const updateTransaction = async (
  id: string,
  transactionData: NewTransaction
) => {
  return await API.put(`/transactions/${id}`, transactionData);
};

export const createTransaction = async (transactionData: NewTransaction) => {
  return await API.post(`/transactions`, transactionData);
};
