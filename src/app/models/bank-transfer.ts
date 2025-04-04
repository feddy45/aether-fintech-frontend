import { Card } from './card';

export interface BankTransfer {
  card?: Card | null;
  iban?: string | null;
  beneficiary?: string | null;
  amount?: number | null;
  description?: string | null;
}
