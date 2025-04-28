import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideHttpClient(), MessageService, AuthenticationService],
    })
      .compileComponents();

    authService = TestBed.inject(AuthenticationService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call authentication service with inserted username and password', () => {
    const loginSpy = jest.spyOn(authService, 'login');
    component.loginForm.get('username')?.setValue('mrossi');
    component.loginForm.get('password')?.setValue('password');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('button'),
    ).nativeElement;

    submitButton.click();
    fixture.detectChanges();

    expect(loginSpy).toHaveBeenCalledWith({ username: 'mrossi', password: 'password' });
  });
});
