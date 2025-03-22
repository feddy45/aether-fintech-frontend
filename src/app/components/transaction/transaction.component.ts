import { Component, input } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'aef-transaction',
  imports: [
    DatePipe,
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  transaction = input.required<Transaction>();
}
