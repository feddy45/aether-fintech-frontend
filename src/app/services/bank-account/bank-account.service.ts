import { AuthenticationService } from './../authentication/authentication.service';
import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { BankAccount } from '../../models/bank-account';
import { Card } from '../../models/card';

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
  authenticationSerivce = inject(AuthenticationService);
  userBankAccounts = signal<BankAccount[]>([]);

  constructor(private readonly http: HttpClient) {
    effect(() => {
        if(this.authenticationSerivce.user()){
          this.getAndSetUserBankAccounts();
        }
    })
  }

  getAndSetUserBankAccounts() {
    this.getAll().subscribe(response => {
      this.userBankAccounts.set(response);
    });
  }

  getAll() {
    return this.http.get<GetBankAccountsResponse>('/api/bank-accounts').pipe(map(res => res.bankAccounts));
  }

  getTransactions(bankAccountId: string, cards?: Card[]) {
    let params = new HttpParams();
    if (cards?.length) {
      params = params.set('cards', cards.map(card => card.id).join(','));
    }
    return this.http.get<GetTransactionsResponse>(`/api/bank-accounts/${bankAccountId}/transactions`, { params }).pipe(map(res => res.transactions));
  }
}
