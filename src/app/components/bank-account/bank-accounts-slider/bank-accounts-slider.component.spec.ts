import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsSliderComponent } from './bank-accounts-slider.component';

describe('BankAccountsSliderComponent', () => {
  let component: BankAccountsSliderComponent;
  let fixture: ComponentFixture<BankAccountsSliderComponent>;

  const mockedBankAccounts = [
    { id: '1', name: 'Account 1', iban: 'IT60X0542811101000000123460', balance: 1000 },
    { id: '2', name: 'Account 2', balance: 2000, iban: 'IT60X0542811101000000123464' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountsSliderComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BankAccountsSliderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('bankAccounts', mockedBankAccounts);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
