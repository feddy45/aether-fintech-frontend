import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountSelectComponent } from './bank-account-select.component';
import { provideHttpClient } from '@angular/common/http';
import { BankAccountService } from '../../../../services/bank-account/bank-account.service';
import { mockedBankAccounts } from '../../../../mocks/bank-account';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { BankAccount } from '../../../../models/bank-account';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CurrencyPipe } from '@angular/common';

describe('BankAccountSelectComponent', () => {
  let fixture: ComponentFixture<BankAccountSelectComponent>;
  let currencyPipe: CurrencyPipe;

  beforeEach(async () => {

    const mockUserBankAccounts = signal<BankAccount[]>(mockedBankAccounts);
    window.matchMedia =
      window.matchMedia ||
      function() {
        return {
          matches: false,
        };
      };

    await TestBed.configureTestingModule({
      imports: [BankAccountSelectComponent],
      providers: [provideHttpClient(), {
        provide: BankAccountService,
        useValue: { getAll: jest.fn().mockReturnValue(of(mockedBankAccounts)), userBankAccounts: mockUserBankAccounts },
      }, provideNoopAnimations(), CurrencyPipe],
    })
      .compileComponents();

    currencyPipe = TestBed.inject(CurrencyPipe);

    fixture = TestBed.createComponent(BankAccountSelectComponent);
    fixture.componentRef.setInput('formControlName', 'formControlNameSelect');
    fixture.componentRef.setInput('selectId', 'test-select-id');
    fixture.componentRef.setInput('label', 'Select Bank account');

    fixture.detectChanges();
  });

  it.each(mockedBankAccounts)('should format correctly options', (mockBankAccount: BankAccount) => {
    const select = fixture.debugElement.query(By.css('#test-select-id'));
    select.nativeElement.click();
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.css(`#test-select-id-option-${mockBankAccount.id}`));
    const text = option.query(By.css('.bank-account-text')).nativeElement.textContent;
    const balance = option.query(By.css('.bank-account-balance')).nativeElement.textContent;
    expect(text).toBe(mockBankAccount.name);
    const currencyFormatted = currencyPipe.transform(mockBankAccount.balance, 'EUR', 'symbol', '1.2-2');
    expect(balance).toBe(`Disponibilità: ${currencyFormatted}`);
  });
});
