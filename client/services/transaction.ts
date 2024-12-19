import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NewTransaction, Transaction } from "@/types/transaction";
import { auth } from "@/firebaseConfig";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const transactionsRef = collection(db, "transactions");
  const q = query(transactionsRef, where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
  );
};

export const getTransactionDetails = async (
  id: string
): Promise<Transaction> => {
  const transactionRef = doc(db, "transactions", id);
  const snapshot = await getDoc(transactionRef);

  if (!snapshot.exists()) {
    throw new Error("Transaction not found");
  }

  return { id: snapshot.id, ...snapshot.data() } as Transaction;
};

export const deleteTransaction = async (id: string) => {
  const transactionRef = doc(db, "transactions", id);
  await deleteDoc(transactionRef);
};

export const updateTransaction = async (id: string, transactionData: any) => {
  const transactionRef = doc(db, "transactions", id);
  await updateDoc(transactionRef, transactionData);
};

export const createTransaction = async (transactionData: NewTransaction) => {
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const transactionsRef = collection(db, "transactions");
  await addDoc(transactionsRef, {
    ...transactionData,
    userId: user.uid,
    createdAt: new Date().toISOString(),
  });
};
