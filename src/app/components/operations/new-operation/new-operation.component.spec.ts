/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewOperationComponent } from './new-operation.component';
import { provideHttpClient } from '@angular/common/http';
import { mockedBankAccounts } from '../../../mocks/bank-account';
import { BankAccount } from '../../../models/bank-account';
import { BankAccountService } from '../../../services/bank-account/bank-account.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { signal } from '@angular/core';

class MockResizeObserver {
  observe() {
  }

  unobserve() {
  }

  disconnect() {
  }
}

describe('NewOperationComponent', () => {
  let fixture: ComponentFixture<NewOperationComponent>;

  const bankAccounts = signal<BankAccount[]>(mockedBankAccounts);

  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver as any;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOperationComponent],
      providers: [provideHttpClient(), {
        provide: BankAccountService,
        useValue: {
          userBankAccounts: bankAccounts,
          getAll: jest.fn().mockReturnValue(of([])),
        },
      }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewOperationComponent);
    fixture.detectChanges();
  });

  it('should load all the tabs if user has 2 or more bank accounts ', () => {
    const tabs = fixture.debugElement.queryAll(By.css('p-tab'));
    expect(tabs.length).toBe(2);
  });

  it('should load only bank transfer card if user has only one bank account', () => {
    bankAccounts.set([mockedBankAccounts[0]]);
    fixture.detectChanges();
    const tabs = fixture.debugElement.queryAll(By.css('p-tab'));
    const tabBankTransfer = fixture.debugElement.query(By.css('[data-testid="tab-Bonifico"]'));
    expect(tabs.length).toBe(1);
    expect(tabBankTransfer).toBeTruthy();
  });
});
