export interface BankTransfer {
  iban?: string | null;
  beneficiary?: string | null;
  amount?: number | null;
  description?: string | null;
}
