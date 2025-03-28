import { Component, inject, signal } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TransactionComponent } from '../transaction/transaction.component';
import { CardsSliderComponent } from '../cards-slider/cards-slider.component';
import { Card } from '../../models/card';
import { CardService } from '../../services/card/card.service';

@Component({
  selector: 'aef-wallet',
  imports: [
    TransactionComponent,
    CardsSliderComponent,
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css',
})
export class WalletComponent {
  cardService = inject(CardService);
  transactions = signal<Transaction[]>([]);


  changeCardSelected(cardSelected: Card | undefined) {
    if (cardSelected) {
      this.cardService.getTransactions(cardSelected.id).subscribe(transactions => {
        this.transactions.set(transactions);
      });
    }
  }
}
