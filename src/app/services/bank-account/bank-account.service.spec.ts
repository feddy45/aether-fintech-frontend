import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BankAccountService } from './bank-account.service';
import { provideHttpClient } from '@angular/common/http';
import { mockedBankAccounts, transactionsMock } from '../../mocks/bank-account';
import { cardsMock } from '../../mocks/card';

describe('BankAccountService', () => {
  let service: BankAccountService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BankAccountService,
      ],
    });

    service = TestBed.inject(BankAccountService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should retrieve bank accounts and store them', done => {
    const req = httpTesting.expectOne('/api/bank-accounts');
    req.flush({ bankAccounts: mockedBankAccounts });

    setTimeout(() => {
      try {
        expect(service.userBankAccounts()).toEqual(mockedBankAccounts);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('should retrieve transactions for a bank account', done => {
    const req1 = httpTesting.expectOne('/api/bank-accounts');
    req1.flush({ bankAccounts: mockedBankAccounts });


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
    const req1 = httpTesting.expectOne('/api/bank-accounts');
    req1.flush({ bankAccounts: mockedBankAccounts });
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
