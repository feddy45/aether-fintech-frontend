import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CardService } from './card.service';
import { mockedBankAccounts } from '../../mocks/bank-account';
import { cardsMock } from '../../mocks/card';

describe('CardService', () => {
  let service: CardService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CardService,
      ],
    });

    service = TestBed.inject(CardService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch cards by bank account ID', done => {
    const bankAccountId = mockedBankAccounts[0].id;

    service.getByBankAccountId(bankAccountId).subscribe(cards => {
      try {
        expect(cards).toEqual(cardsMock);
        done();
      } catch (error) {
        done(error);
      }
    });

    const req = httpTesting.expectOne(`/api/cards?bankAccountId=${bankAccountId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ cards: cardsMock });
  });
});
