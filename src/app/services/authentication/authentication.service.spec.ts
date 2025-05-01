import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginRequest, LoginResponse } from '../../models/login';
import { provideHttpClient } from '@angular/common/http';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTesting: HttpTestingController;
  let router: Router;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthenticationService,
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: MessageService, useValue: { add: jest.fn() } },
      ],
    });

    router = TestBed.inject(Router);
    service = TestBed.inject(AuthenticationService);
    httpTesting = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  it('should login and store token, set user and navigate', done => {
    const loginRequest: LoginRequest = { username: 'test', password: 'test' };
    const testJwt =
      'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjMiLCJ1bmlxdWVfbmFtZSI6InRlc3R1c2VyIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IkRvZSIsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDEiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.';

    service.login(loginRequest);

    const req = httpTesting.expectOne('/api/auth/login'); // 👈 intercetta subito dopo
    req.flush({ token: testJwt } as LoginResponse);

    setTimeout(() => {
      try {
        expect(localStorage.getItem('auth_token')).toBe(testJwt);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(service.user()).toEqual({
          id: '123',
          username: 'testuser',
          firstName: 'John',
          lastName: 'Doe',
          birthDate: new Date('2000-01-01'),
          email: 'john@example.com',
        });
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should logout and clear token, reset user and navigate to login', () => {
    const testJwt =
      'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjMiLCJ1bmlxdWVfbmFtZSI6InRlc3R1c2VyIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IkRvZSIsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDEiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.';
    localStorage.setItem('auth_token', testJwt);

    service.logout();

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(service.user()).toBeUndefined();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });


});
