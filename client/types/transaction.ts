export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: string;
  note?: string | null;
  userId: string;
}

export interface NewTransaction {
  title: string;
  amount: number;
  type: string;
  category: string;
  date: string;
  note?: string | null;
}
