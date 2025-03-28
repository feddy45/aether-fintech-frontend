import { inject, Injectable } from '@angular/core';
import { BaseApiService } from '../base-api/base-api.service';
import { Card } from '../../models/card';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface GetCardsResponse {
  cards: Card[];
}

@Injectable({
  providedIn: 'root',
})
export class CardService extends BaseApiService<Card> {
  http = inject(HttpClient);

  override getAll() {
    return this.http.get<GetCardsResponse>('/api/cards').pipe(map(res => res.cards));
  }
}
