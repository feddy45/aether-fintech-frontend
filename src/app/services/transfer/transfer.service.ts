import { inject, Injectable } from '@angular/core';
import { BankTransfer } from '../../models/bank-transfer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  http = inject(HttpClient);

  addBankTransfer(value: BankTransfer) {
    return this.http.post('/api/transfers', value);
  }
}
