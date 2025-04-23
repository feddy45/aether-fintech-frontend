import { inject, Injectable } from '@angular/core';
import { Card } from '../../models/card';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Transaction } from '../../models/transaction';

interface GetCardsResponse {
  cards: Card[];
}

interface GetTransactionsResponse {
  transactions: Transaction[];
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<GetCardsResponse>('/api/cards').pipe(map(res => res.cards));
  }

  getTransactions(cardId: string) {
    return this.http.get<GetTransactionsResponse>(`/api/cards/${cardId}/transactions`).pipe(map(res => res.transactions));
  }
}
