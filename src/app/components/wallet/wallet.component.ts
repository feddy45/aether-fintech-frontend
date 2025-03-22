import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../services/wallet/transaction.service';
import { Transaction } from '../../models/transaction';
import { TransactionComponent } from './transaction/transaction.component';

@Component({
  selector: 'aef-wallet',
  imports: [
    TransactionComponent,
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css',
})
export class WalletComponent implements OnInit {
  transactionService = inject(TransactionService);
  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.transactionService.getAll().subscribe(serverTransactions => {
      this.transactions.set(serverTransactions);
    });
  }
}
