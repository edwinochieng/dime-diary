import { Transaction } from "@/types/transaction";

export const calculateTotals = (transactions: Transaction[]) => {
  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const totalIncome = transactions
    .filter((transaction) => transaction.transaction_type === "Income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.transaction_type === "Expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return { totalAmount, totalIncome, totalExpenses };
};
