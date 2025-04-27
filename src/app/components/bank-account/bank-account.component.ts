import { Component, inject, OnInit, signal } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { BankAccountsSliderComponent } from './bank-accounts-slider/bank-accounts-slider.component';
import { BankAccountService } from '../../services/bank-account/bank-account.service';
import { Card } from '../../models/card';
import { CardComponent } from '../card/card.component';
import { CardService } from '../../services/card/card.service';
import { TransactionsComponent } from '../transactions/transactions.component';
import { Tooltip } from 'primeng/tooltip';
import { CarouselPageEvent } from 'primeng/carousel';
import { BankAccount } from '../../models/bank-account';

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
export class BankAccountComponent implements OnInit {
  bankAccountService = inject(BankAccountService);
  cardService = inject(CardService);
  transactions = signal<Transaction[]>([]);
  cards = signal<Card[]>([]);
  cardsSelected = signal<Card[]>([]);
  bankAccounts = signal<BankAccount[]>([]);
  bankAccountSelected = signal<BankAccount | undefined>(undefined);

  ngOnInit() {
    this.bankAccountService.getAll().subscribe(response => {
      this.bankAccounts.set(response);
      this.bankAccountSelected.set(response[0]);
      this.resetCardsByAccount();
    });
  }

  changeBankAccountSelected(page: CarouselPageEvent) {
    if (page.page !== undefined) {
      this.bankAccountSelected.set(this.bankAccountService.userBankAccounts()[page.page]);
      this.resetCardsByAccount();
    }
  }

  resetCardsByAccount() {
    const bankAccountSelected = this.bankAccountSelected();
    if (bankAccountSelected) {

      this.cardsSelected.set([]);

      this.cardService.getByBankAccountId(bankAccountSelected.id).subscribe(cards => {
        this.cards.set(cards);
      });
      this.getTransactions();
    }
  }

  isCardSelected(card: Card): boolean {
    return this.cardsSelected().some(selected => selected.id === card.id);
  }

  cardSelectedChange(cardSelected: Card) {
    if (this.cardsSelected().some(card => card.id === cardSelected.id)) {
      this.cardsSelected.set(this.cardsSelected().filter(card => card.id !== cardSelected.id));
    } else {
      this.cardsSelected.set([...this.cardsSelected(), cardSelected]);
    }

    this.getTransactions();
  }

  getTransactions() {
    const bankAccountSelected = this.bankAccountSelected();
    if (bankAccountSelected) {
      this.bankAccountService.getTransactions(bankAccountSelected.id, this.cardsSelected()).subscribe(transactions => {
        this.transactions.set(transactions);
      });
    }
  }
}
