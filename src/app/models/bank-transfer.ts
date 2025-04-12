import { Card } from './card';

export interface BankTransfer {
  id: string;
  card?: Card | null;
  iban?: string | null;
  beneficiary?: string | null;
  amount?: number | null;
  description?: string | null;
}

export interface BankTransferCreate {
  cardId?: string;
  iban?: string;
  beneficiary?: string;
  amount?: number;
  description?: string;
}
