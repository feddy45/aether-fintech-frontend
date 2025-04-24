import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { BankAccount } from '../../models/bank-account';

interface GetBankAccountsResponse {
  bankAccounts: BankAccount[];
}

interface GetTransactionsResponse {
  transactions: Transaction[];
}

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<GetBankAccountsResponse>('/api/bank-accounts').pipe(map(res => res.bankAccounts));
  }

  getTransactions(bankAccountId: string) {
    return this.http.get<GetTransactionsResponse>(`/api/bank-accounts/${bankAccountId}/transactions`).pipe(map(res => res.transactions));
  }
}
