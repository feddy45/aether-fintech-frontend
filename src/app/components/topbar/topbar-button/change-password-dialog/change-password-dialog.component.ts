import { Component, inject, model, output } from '@angular/core';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ChangePasswordRequest } from '../../../../models/authentication';
import { InputLabelComponent } from '../../../shared/input-label/input-label.component';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Password } from 'primeng/password';

@Component({
  selector: 'aef-change-password-dialog',
  imports: [
    FormsModule,
    InputLabelComponent,
    ReactiveFormsModule,
    Button,
    Dialog,
    Password,

  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css',
})
export class ChangePasswordDialogComponent {
  authService = inject(AuthenticationService);
  dialogVisible = model.required<boolean>();
  passwordChanged = output();

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl<string | undefined>(undefined, Validators.required),
    newPassword: new FormControl<string | undefined>(undefined, Validators.required),
    confirmPassword: new FormControl<string | undefined>(undefined, Validators.required),
  }, { validators: this.passwordMatchValidator() });

  changePassword() {
    if (this.changePasswordForm.valid) {
      const changePasswordRequest: ChangePasswordRequest = {
        oldPassword: this.changePasswordForm.get('oldPassword')?.value ?? '',
        newPassword: this.changePasswordForm.get('newPassword')?.value ?? '',
      };
      this.authService.changePassword(changePasswordRequest).subscribe(() => {
        this.passwordChanged.emit();
      });
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newPassword = control.get('newPassword')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }
}
