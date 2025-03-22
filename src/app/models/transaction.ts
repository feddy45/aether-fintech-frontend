export interface Transaction {
  id: number;
  amount: number;
  date: Date;
  description: string;
  type: string;
  wallet: number;
}
