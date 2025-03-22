import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api/base-api.service';
import { Transaction } from '../../models/transaction';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseApiService<Transaction> {

  override getAll(): Observable<Transaction[]> {
    return of([
      { id: 1, amount: 100, date: new Date('2023-01-01'), description: 'Deposit', type: 'credit', wallet: 1 },
      { id: 2, amount: 50, date: new Date('2023-01-02'), description: 'Withdrawal', type: 'debit', wallet: 1 },
      { id: 3, amount: 200, date: new Date('2023-01-03'), description: 'Transfer', type: 'credit', wallet: 2 },
      { id: 4, amount: 75, date: new Date('2023-01-04'), description: 'Payment', type: 'debit', wallet: 2 },
      { id: 5, amount: 150, date: new Date('2023-01-05'), description: 'Deposit', type: 'credit', wallet: 3 },
      { id: 6, amount: 25, date: new Date('2023-01-06'), description: 'Withdrawal', type: 'debit', wallet: 3 },
      { id: 7, amount: 300, date: new Date('2023-01-07'), description: 'Transfer', type: 'credit', wallet: 4 },
      { id: 8, amount: 100, date: new Date('2023-01-08'), description: 'Payment', type: 'debit', wallet: 4 },
      { id: 9, amount: 50, date: new Date('2023-01-09'), description: 'Deposit', type: 'credit', wallet: 5 },
      { id: 10, amount: 75, date: new Date('2023-01-10'), description: 'Withdrawal', type: 'debit', wallet: 5 },
    ]);
  }
}
