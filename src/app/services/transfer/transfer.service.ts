import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer, BankTransferCreate } from '../../models/bank-transfer';
import { map } from 'rxjs';
import { InternalTransferCreate } from '../../models/internal-transfer';

interface GetTransfersResponse {
  transfers: BankTransfer[];
}

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  http = inject(HttpClient);

  addBankTransfer(value: BankTransferCreate) {
    return this.http.post('/api/transfers/bank-transfer', value);
  }

  addInternalTransfer(value: InternalTransferCreate) {
    return this.http.post('/api/transfers/internal-transfer', value);
  }

  getAll() {
    return this.http.get<GetTransfersResponse>('/api/transfers').pipe(map((response: GetTransfersResponse) =>
      response.transfers,
    ));
  }
}
