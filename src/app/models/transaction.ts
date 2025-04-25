export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
  type: TransactionType;
}

export type TransactionType = 'income' | 'expense' | 'transfer';
