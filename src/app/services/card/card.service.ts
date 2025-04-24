import { inject, Injectable } from '@angular/core';
import { Card } from '../../models/card';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface GetCardsResponse {
  cards: Card[];
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  http = inject(HttpClient);

  getByBankAccountId(bankAccountId: string) {
    return this.http.get<GetCardsResponse>(`/api/cards?bankAccountId=${bankAccountId}`).pipe(map(res => res.cards));
  }
}
