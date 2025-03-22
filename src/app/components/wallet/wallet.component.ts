import { Component, inject, signal } from '@angular/core';
import { TransactionService } from '../../services/wallet/transaction.service';
import { Transaction } from '../../models/transaction';
import { TransactionComponent } from '../transaction/transaction.component';
import { CardsSliderComponent } from '../cards-slider/cards-slider.component';
import { Card } from '../../models/card';

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
  transactionService = inject(TransactionService);
  transactions = signal<Transaction[]>([]);


  changeCardSelected(cardSelected: Card | undefined) {
    if (cardSelected) {
      this.transactionService.getTransactionsByCardId(cardSelected.id).subscribe(transactions => {
        this.transactions.set(transactions);
      });
    }
  }
}
