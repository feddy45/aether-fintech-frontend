import { Component, inject, signal } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { BankAccountsSliderComponent } from './bank-accounts-slider/bank-accounts-slider.component';
import { BankAccountService } from '../../services/bank-account/bank-account.service';
import { BankAccount } from '../../models/bank-account';
import { Card } from '../../models/card';
import { CardComponent } from '../card/card.component';
import { CardService } from '../../services/card/card.service';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'aef-bank-account',
  imports: [
    BankAccountsSliderComponent,
    CardComponent,
    TransactionsComponent,
  ],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css',
})
export class BankAccountComponent {
  bankAccountService = inject(BankAccountService);
  cardService = inject(CardService);
  transactions = signal<Transaction[]>([]);
  cards = signal<Card[]>([]);

  changeBankAccountSelected(bankAccountSelected: BankAccount | undefined) {
    if (bankAccountSelected) {
      this.bankAccountService.getTransactions(bankAccountSelected.id).subscribe(transactions => {
        this.transactions.set(transactions);
      });
      this.cardService.getByBankAccountId(bankAccountSelected.id).subscribe(cards => {
        this.cards.set(cards);
      });
    }
  }
}
