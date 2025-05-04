import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BankAccountService } from './bank-account.service';
import { provideHttpClient } from '@angular/common/http';
import { mockedBankAccounts, transactionsMock } from '../../mocks/bank-account';
import { cardsMock } from '../../mocks/card';
import { MessageService } from 'primeng/api';


describe('BankAccountService', () => {
  let service: BankAccountService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BankAccountService,
        MessageService,
      ],
    });
    service = TestBed.inject(BankAccountService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should retrieve transactions for a bank account', done => {
    const bankAccountId = mockedBankAccounts[0].id;
    service.getTransactions(bankAccountId).subscribe(transactions => {
      expect(transactions).toEqual(transactionsMock);
      done();
    });

    const req = httpTesting.expectOne(`/api/bank-accounts/${bankAccountId}/transactions`);
    expect(req.request.method).toBe('GET');
    req.flush({ transactions: transactionsMock });
  });

  it('should pass card IDs as query parameters for transactions', done => {
    const bankAccountId = mockedBankAccounts[0].id;

    service.getTransactions(bankAccountId, [cardsMock[1]]).subscribe(transactions => {
      expect(transactions).toEqual(transactionsMock);
      done();
    });

    const req = httpTesting.expectOne(
      `/api/bank-accounts/${bankAccountId}/transactions?cards=2`,
    );
    expect(req.request.method).toBe('GET');
    req.flush({ transactions: transactionsMock });
  });
});
