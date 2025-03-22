import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api/base-api.service';
import { Card } from '../../models/card';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService extends BaseApiService<Card> {

  override getAll() {
    return of([
      {
        id: 0,
        name: 'Visa Platinum',
        number: '4111111111111111',
        expirationDate: new Date('2025-12-31'),
        balance: 5000,
      },
      {
        id: 1,
        name: 'MasterCard Gold',
        number: '5500000000000004',
        expirationDate: new Date('2024-11-30'),
        balance: 3000,
      },
      {
        id: 2,
        name: 'American Express',
        number: '340000000000009',
        expirationDate: new Date('2026-10-31'),
        balance: 7000,
      },
      { id: 3, name: 'Discover', number: '6011000000000004', expirationDate: new Date('2023-09-30'), balance: 2000 },
      {
        id: 4,
        name: 'Visa Classic',
        number: '4111111111111112',
        expirationDate: new Date('2025-08-31'),
        balance: 1000,
      },
    ]);
  }
}
