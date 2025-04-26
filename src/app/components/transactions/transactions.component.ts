import { Component, computed, input } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TableModule } from 'primeng/table';
import { getMonthLabeled } from '../../utils/date';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'aef-transactions',
  imports: [
    TableModule,
    DatePipe,
    CurrencyPipe,
    NgClass,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
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

  totalIncomeByYearMonth(yearMonth: string) {
    return this.transactionComputed().reduce((acc, transaction) => {
      if (transaction.yearMonth === yearMonth && transaction.type === 'income') {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);
  }

  totalExpenseByYearMonth(yearMonth: string) {
    return this.transactionComputed().reduce((acc, transaction) => {
      if (transaction.yearMonth === yearMonth && (transaction.type === 'expense' || transaction.type === 'transfer')) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);
  }

  correctAmount(amount: number, type: string): number {
    return type === 'income' ? amount : -amount;
  }
}
