import { Component, inject, signal } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { BankAccountsSliderComponent } from './bank-accounts-slider/bank-accounts-slider.component';
import { BankAccountService } from '../../services/bank-account/bank-account.service';
import { BankAccount } from '../../models/bank-account';
import { Card } from '../../models/card';
import { CardComponent } from '../card/card.component';
import { CardService } from '../../services/card/card.service';
import { TransactionsComponent } from '../transactions/transactions.component';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'aef-bank-account',
  imports: [
    BankAccountsSliderComponent,
    CardComponent,
    TransactionsComponent,
    Tooltip,

  ],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css',
})
export class BankAccountComponent {
  bankAccountService = inject(BankAccountService);
  cardService = inject(CardService);
  transactions = signal<Transaction[]>([]);
  cards = signal<Card[]>([]);
  cardsSelected = signal<Card[]>([]);
  bankAccountSelected = signal<BankAccount | undefined>(undefined);

  changeBankAccountSelected(bankAccountSelected: BankAccount | undefined) {
    this.bankAccountSelected.set(bankAccountSelected);

    if (bankAccountSelected) {
      this.bankAccountService.getTransactions(bankAccountSelected.id).subscribe(transactions => {
        this.transactions.set(transactions);
      });
      this.cardService.getByBankAccountId(bankAccountSelected.id).subscribe(cards => {
        this.cards.set(cards);
        this.cardsSelected.set(cards);
      });
    }
  }

  isCardSelected(card: Card): boolean {
    return this.cardsSelected().some(selected => selected.id === card.id);
  }

  cardSelectedChange(cardSelected: Card) {
    const bankAccount = this.bankAccountSelected();
    if (bankAccount) {
      this.cardsSelected.set([cardSelected]);
      this.bankAccountService.getTransactions(bankAccount.id, cardSelected.id).subscribe(transactions => {
        this.transactions.set(transactions);
      });
    }
  }
}
