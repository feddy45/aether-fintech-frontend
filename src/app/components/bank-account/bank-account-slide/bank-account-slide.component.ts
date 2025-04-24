import { Component, input } from '@angular/core';
import { BankAccount } from '../../../models/bank-account';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'aef-bank-account-slide',
  imports: [
    CurrencyPipe,
  ],
  templateUrl: './bank-account-slide.component.html',
  styleUrl: './bank-account-slide.component.css',
})
export class BankAccountSlideComponent {
  account = input.required<BankAccount>();
}
