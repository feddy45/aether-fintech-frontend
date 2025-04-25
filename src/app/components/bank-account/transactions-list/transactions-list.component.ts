import { Component, computed, input } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { TableModule } from 'primeng/table';
import { getMonthLabeled } from '../../../utils/date';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'aef-transactions-list',
  imports: [
    TableModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css',
})
export class TransactionsListComponent {
  transactions = input<Transaction[]>([]);
  transactionComputed = computed(() => {

    return this.transactions().map(transaction => ({
      ...transaction,
      yearMonth: this.getYearMonth(new Date(transaction.date)).toISOString(),
      yearMonthLabel: this.getMonthLabel(new Date(transaction.date)),
    }));
  });

  getMonthLabel(date: Date): string {
    return getMonthLabeled(date) + ' ' + date.getFullYear();
  }

  getYearMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
}
