import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactsService } from './contacts.service';
import { mockedContacts } from '../../mocks/contact';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ContactsService,
      ],
    });

    service = TestBed.inject(ContactsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch all contacts', done => {
    service.getAll().subscribe(contacts => {
      try {
        expect(contacts).toEqual(mockedContacts);
        done();
      } catch (error) {
        done(error);
      }
    });

    const req = httpTesting.expectOne('/api/contacts');
    expect(req.request.method).toBe('GET');
    req.flush({ contacts: mockedContacts });
  });
});
