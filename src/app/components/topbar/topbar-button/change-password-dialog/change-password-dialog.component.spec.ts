import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordDialogComponent } from './change-password-dialog.component';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { of } from 'rxjs';
import { userMock } from '../../../../mocks/user';

describe('ChangePasswordDialogComponent', () => {
  let component: ChangePasswordDialogComponent;
  let fixture: ComponentFixture<ChangePasswordDialogComponent>;
  const mockChangePassword = jest.fn().mockReturnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordDialogComponent],
      providers: [provideHttpClient(), MessageService, provideAnimations(), {
        provide: AuthenticationService,
        useValue: { changePassword: mockChangePassword, user: () => userMock },
      }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('dialogVisible', true);
    fixture.detectChanges();
  });

  it('should initialize the form with empty values', () => {
    expect(component.changePasswordForm.value.oldPassword).toBeNull();
    expect(component.changePasswordForm.value.newPassword).toBeNull();
    expect(component.changePasswordForm.value.confirmPassword).toBeNull();
  });

  it('should call addBankTransfer when form is valid and is submitted', () => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="btn-submit-change-password"] button'),
    ).nativeElement;
    component.changePasswordForm.get('oldPassword')?.setValue('vecchiaPassword');
    component.changePasswordForm.get('newPassword')?.setValue('nuovaPassword');
    component.changePasswordForm.get('confirmPassword')?.setValue('nuovaPassword');
    fixture.detectChanges();
    expect(component.changePasswordForm.invalid).toBeFalsy();
    button.click();
    fixture.detectChanges();
    expect(mockChangePassword).toHaveBeenCalledWith({
      oldPassword: 'vecchiaPassword',
      newPassword: 'nuovaPassword',
    });
  });

  it('should invalid form if new password and confirm password are not equals', () => {
    component.changePasswordForm.get('oldPassword')?.setValue('vecchiaPassword');
    component.changePasswordForm.get('newPassword')?.setValue('nuovaPassword');
    component.changePasswordForm.get('confirmPassword')?.setValue('nuovaPasswordErrata');
    fixture.detectChanges();
    expect(component.changePasswordForm.invalid).toBeTruthy();
  });
});
