import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  userBankAccounts = signal<BankAccount[]>([]);

  constructor(private readonly http: HttpClient) {
    this.getAll().subscribe(response => {
      this.userBankAccounts.set(response);
    });
  }

  getAll() {
    return this.http.get<GetBankAccountsResponse>('/api/bank-accounts').pipe(map(res => res.bankAccounts));
  }

  getTransactions(bankAccountId: string, cardId?: string) {
    let params = new HttpParams();
    if (cardId) {
      params = params.set('cardId', cardId);
    }
    return this.http.get<GetTransactionsResponse>(`/api/bank-accounts/${bankAccountId}/transactions`, { params }).pipe(map(res => res.transactions));
  }
}
