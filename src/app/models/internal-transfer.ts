import { BankAccount } from './bank-account';

export interface InternalTransfer {
  id: string;
  orginBankAccount?: BankAccount | null;
  destinationBankAccount?: BankAccount | null;
  amount?: number | null;
  description?: string | null;
}

export interface InternalTransferCreate {
  originBankAccountId?: string;
  destinationBankAccountId?: string;
  amount?: number;
  description?: string;
}
