import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { InputLabelComponent } from '../shared/input-label/input-label.component';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { Password } from 'primeng/password';
import { AutoFocus } from 'primeng/autofocus';

@Component({
  selector: 'aef-login',
  imports: [
    ReactiveFormsModule,
    InputLabelComponent,
    InputText,
    Button,
    Password,
    AutoFocus,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  loginForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.authenticationService.login(loginRequest);
    }
  }
}
