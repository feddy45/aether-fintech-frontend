import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer, BankTransferCreate } from '../../models/bank-transfer';
import { map } from 'rxjs';

interface GetTransfersResponse {
  transfers: BankTransfer[];
}

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  http = inject(HttpClient);

  addBankTransfer(value: BankTransferCreate) {
    return this.http.post('/api/transfers', value);
  }

  getAll() {
    return this.http.get<GetTransfersResponse>('/api/transfers').pipe(map((response: GetTransfersResponse) =>
      response.transfers,
    ));
  }
}
