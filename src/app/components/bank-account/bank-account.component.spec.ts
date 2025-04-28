import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountComponent } from './bank-account.component';
import { provideHttpClient } from '@angular/common/http';
import { CarouselPageEvent } from 'primeng/carousel';
import { CardService } from '../../services/card/card.service';
import { Card } from '../../models/card';
import { of, Subject } from 'rxjs';
import { BankAccountService } from '../../services/bank-account/bank-account.service';
import { MessageService } from 'primeng/api';
import { Transaction } from '../../models/transaction';

describe('BankAccountComponent', () => {
  let component: BankAccountComponent;
  let fixture: ComponentFixture<BankAccountComponent>;
  const sub = new Subject<Card[]>();
  const cardsMock: Card[] = [
    {
      id: '1',
      description: 'Card 1',
      number: '1234-5678-9012-3456',
      expirationDate: new Date('2025-12-31'),
    },
    {
      id: '2',
      description: 'Card 2',
      number: '4563-5678-1234-3456',
      expirationDate: new Date('2025-12-31'),
    },
  ];
  const mockedBankAccounts = [
    { id: '1', name: 'Account 1', iban: 'IT60X0542811101000000123460', balance: 1000 },
    { id: '2', name: 'Account 2', balance: 2000, iban: 'IT60X0542811101000000123464' },
  ];

  const transactionsMock: Transaction[] = [
    {
      id: '1',
      amount: 150.75,
      date: new Date('2024-10-01'),
      description: 'Pagamento bolletta luce',
      type: 'expense',
    },
    {
      id: '2',
      amount: 2000.0,
      date: new Date('2024-10-05'),
      description: 'Stipendio mensile',
      type: 'income',
    },
    {
      id: '3',
      amount: 50.0,
      date: new Date('2024-10-10'),
      description: 'Ricarica telefonica',
      type: 'expense',
    },
    {
      id: '4',
      amount: 300.0,
      date: new Date('2024-10-15'),
      description: 'Bonifico a Mario Rossi',
      type: 'transfer',
    },
  ];


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
