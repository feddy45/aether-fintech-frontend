import { Component, inject, signal } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { BankAccountsSliderComponent } from './bank-accounts-slider/bank-accounts-slider.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { BankAccountService } from '../../services/bank-account/bank-account.service';
import { BankAccount } from '../../models/bank-account';

@Component({
  selector: 'aef-bank-account',
  imports: [
    BankAccountsSliderComponent,
    TransactionComponent,
  ],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css',
})
export class BankAccountComponent {
  bankAccountService = inject(BankAccountService);
  transactions = signal<Transaction[]>([]);


  changeCardSelected(bankAccountSelected: BankAccount | undefined) {
    if (bankAccountSelected) {
      this.bankAccountService.getTransactions(bankAccountSelected.id).subscribe(transactions => {
        this.transactions.set(transactions);
      });
    }
  }
}
