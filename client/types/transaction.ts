export interface Transaction {
  id: string;
  title: string;
  amount: number;
  transaction_type: string;
  category: string;
  date: string;
  note?: string | null;
  user_id: string;
}

export interface NewTransaction {
  title: string;
  amount: number;
  transaction_type: string;
  category: string;
  date: string;
  note?: string | null;
}
