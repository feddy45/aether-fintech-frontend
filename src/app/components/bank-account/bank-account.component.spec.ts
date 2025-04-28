import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountComponent } from './bank-account.component';
import { provideHttpClient } from '@angular/common/http';
import { CarouselPageEvent } from 'primeng/carousel';
import { CardService } from '../../services/card/card.service';
import { Card } from '../../models/card';
import { of, Subject } from 'rxjs';
import { BankAccountService } from '../../services/bank-account/bank-account.service';
import { MessageService } from 'primeng/api';
import { mockedBankAccounts, transactionsMock } from '../../mocks/bank-account';
import { cardsMock } from '../../mocks/card';

describe('BankAccountComponent', () => {
  let component: BankAccountComponent;
  let fixture: ComponentFixture<BankAccountComponent>;
  const sub = new Subject<Card[]>();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountComponent],
      providers: [
        provideHttpClient(),
        MessageService,
        {
          provide: CardService, useValue: { getByBankAccountId: () => of(cardsMock) },
        },
        {
          provide: BankAccountService,
          useValue: {
            getAll: () => of(mockedBankAccounts),
            userBankAccounts: jest.fn(),
            getTransactions: () => of(transactionsMock),
          },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should reset cards and bankAccountsSelected by change page', () => {
    const page: CarouselPageEvent = { page: 1 };
    component.changeBankAccountSelected(page);
    expect(component.cardsSelected()).toEqual([]);
    expect(component.bankAccountSelected()).toBe(mockedBankAccounts[1]);

    sub.next(cardsMock);
    expect(component.cards()).toEqual(cardsMock);
  });

  it('should set the selected card', () => {
    const cardSelected = cardsMock[0];
    component.cardSelectedChange(cardSelected);
    expect(component.cardsSelected()).toEqual([cardSelected]);
  });

  it('should remove the selected card', () => {
    component.cardsSelected.set(cardsMock);

    const cardSelected = cardsMock[0];
    component.cardSelectedChange(cardSelected);
    expect(component.cardsSelected()).toEqual([cardsMock[1]]);
  });
});
