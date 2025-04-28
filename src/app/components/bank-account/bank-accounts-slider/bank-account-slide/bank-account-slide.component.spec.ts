import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountSlideComponent } from './bank-account-slide.component';
import { BankAccount } from '../../../../models/bank-account';
import { By } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { mockedBankAccounts } from '../../../../mocks/bank-account';

describe('BankAccountSlideComponent', () => {
  let fixture: ComponentFixture<BankAccountSlideComponent>;

  const accountMocked: BankAccount = mockedBankAccounts[1];

  beforeEach(async () => {
    registerLocaleData(localeIt, 'it');

    await TestBed.configureTestingModule({
      imports: [BankAccountSlideComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'it' }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BankAccountSlideComponent);
    fixture.componentRef.setInput('account', accountMocked);

    fixture.detectChanges();
  });

  it('should format balance correctly', () => {
    const balance = fixture.debugElement
      .query(By.css('.balance'))
      .nativeElement.textContent;

    expect(balance).toBe('2.000,00 €');
  });

  it('should display the account name', () => {
    const name = fixture.debugElement
      .query(By.css('.account-name-label'))
      .nativeElement.textContent;

    expect(name).toBe(accountMocked.name);
  });

  it('should display iban', () => {
    const iban = fixture.debugElement
      .query(By.css('.iban'))
      .nativeElement.textContent;

    expect(iban).toBe(accountMocked.iban);
  });
});
