import { Component, input } from '@angular/core';
import { Transaction } from '../../../models/transaction';

@Component({
  selector: 'aef-transaction',
  imports: [],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  transaction = input.required<Transaction>();
}
