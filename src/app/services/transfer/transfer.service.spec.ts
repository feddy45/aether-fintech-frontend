import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TransferService } from './transfer.service';
import { BankTransferCreate } from '../../models/bank-transfer';
import { InternalTransferCreate } from '../../models/internal-transfer';
import { bankTransfersMock } from '../../mocks/bank-transfer';
import { mockedBankAccounts } from '../../mocks/bank-account';

describe('TransferService', () => {
  let service: TransferService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TransferService,
      ],
    });

    service = TestBed.inject(TransferService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch all transfers', done => {
    service.getAll().subscribe(transfers => {
      try {
        expect(transfers).toEqual(bankTransfersMock);
        done();
      } catch (e) {
        done(e);
      }
    });

    const req = httpTesting.expectOne('/api/transfers');
    expect(req.request.method).toBe('GET');
    req.flush({ transfers: bankTransfersMock });
  });

  it('should post a new bank transfer', done => {
    const newTransfer: BankTransferCreate = {
      bankAccountId: mockedBankAccounts[0].id,
      beneficiary: 'Mario Rossi',
      iban: 'IT60X0542811101000000123456',
      amount: 500,
      description: 'Bonifico di test',
    };

    service.addBankTransfer(newTransfer).subscribe(response => {
      try {
        expect(response).toBeTruthy();
        done();
      } catch (e) {
        done(e);
      }
    });

    const req = httpTesting.expectOne('/api/transfers/bank-transfer');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTransfer);
    req.flush({ success: true });
  });

  it('should post a new internal transfer', done => {
    const newInternalTransfer: InternalTransferCreate = {
      originBankAccountId: mockedBankAccounts[0].id,
      destinationBankAccountId: mockedBankAccounts[1].id,
      amount: 300,
      description: 'Giroconto test',
    };

    service.addInternalTransfer(newInternalTransfer).subscribe(response => {
      try {
        expect(response).toBeTruthy();
        done();
      } catch (e) {
        done(e);
      }
    });

    const req = httpTesting.expectOne('/api/transfers/internal-transfer');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newInternalTransfer);
    req.flush({ success: true });
  });
});
