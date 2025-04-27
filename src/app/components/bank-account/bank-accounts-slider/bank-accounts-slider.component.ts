import { Component, inject, model, OnInit, signal } from '@angular/core';
import { Carousel, CarouselPageEvent } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';
import { BankAccountService } from '../../../services/bank-account/bank-account.service';
import { BankAccount } from '../../../models/bank-account';
import { BankAccountSlideComponent } from './bank-account-slide/bank-account-slide.component';

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
export class BankAccountsSliderComponent implements OnInit {
  cardService = inject(BankAccountService);
  bankAccounts = signal<BankAccount[]>([]);
  bankAccountSelected = model.required<BankAccount>();

  ngOnInit() {
    this.cardService.getAll().subscribe(cards => {
      this.bankAccounts.set(cards);
      this.bankAccountSelected.set(this.bankAccounts()[0]);
    });
  }

  onPageChanged(event: CarouselPageEvent) {
    if (event.page !== undefined && this.bankAccounts()) this.bankAccountSelected.set(this.bankAccounts()[event.page]);
  }
}
