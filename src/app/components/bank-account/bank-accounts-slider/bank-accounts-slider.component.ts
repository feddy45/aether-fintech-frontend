import { Component, input, output } from '@angular/core';
import { Carousel, CarouselPageEvent } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';
import { BankAccountSlideComponent } from './bank-account-slide/bank-account-slide.component';
import { BankAccount } from '../../../models/bank-account';

@Component({
  selector: 'aef-bank-accounts-slider',
  imports: [
    Carousel,
    PrimeTemplate,
    BankAccountSlideComponent,
  ],
  templateUrl: './bank-accounts-slider.component.html',
  styleUrl: './bank-accounts-slider.component.css',
})
export class BankAccountsSliderComponent {
  bankAccounts = input.required<BankAccount[]>();
  pageChanged = output<CarouselPageEvent>();
}
