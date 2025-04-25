import { BankAccount } from './bank-account';

export interface BankTransfer {
  id: string;
  bankAccount?: BankAccount | null;
  iban?: string | null;
  beneficiary?: string | null;
  amount?: number | null;
  description?: string | null;
}

export interface BankTransferCreate {
  bankAccountId?: string;
  iban?: string;
  beneficiary?: string;
  amount?: number;
  description?: string;
}
