import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api/base-api.service';
import { Transaction } from '../../models/transaction';
import { Observable, of } from 'rxjs';
import { TransactionsMock } from './mock/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseApiService<Transaction> {

  override getAll(): Observable<Transaction[]> {
    return of(TransactionsMock[0]);
  }

  getTransactionsByCardId(cardId: number): Observable<Transaction[]> {
    return of(TransactionsMock[cardId]);
  }
}
