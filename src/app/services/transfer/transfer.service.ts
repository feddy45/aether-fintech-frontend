import { Injectable } from '@angular/core';
import { BankTransfer } from '../../models/bank-transfer';

@Injectable({
  providedIn: 'root',
})
export class TransferService {

  addBankTransfer(value: BankTransfer) {
    console.log(value);
  }
}
