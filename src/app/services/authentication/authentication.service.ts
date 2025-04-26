import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../../models/login';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';

export interface AefJwtPayload {
  sub: string;
  unique_name: string;
  given_name: string;
  family_name: string;
  birthdate: string;
  email: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router = inject(Router);
  http = inject(HttpClient);
  messageService = inject(MessageService);

  user = signal<User | undefined>(undefined);
  private readonly tokenKey = 'auth_token';

  constructor() {
    this.setUserByToken();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(loginRequest: LoginRequest) {
    this.http.post<LoginResponse>('/api/auth/login', loginRequest).subscribe({
      next: (response) => {
        this.setToken(response.token.token);
        this.setUserByToken();
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.messageService.add({ text: 'Error on login: ' + error, severity: 'error' });
      },
    });

  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
    this.user.set(undefined);
  }

  private setUserByToken() {
    const token = this.getToken();
    if (token) {
      const decodedJwt = jwtDecode<AefJwtPayload>(token);
      this.setUser(decodedJwt);
    }
  }

  private setUser(decodedJwt: AefJwtPayload) {
    this.user.set({
      id: decodedJwt.sub,
      firstName: decodedJwt.given_name,
      lastName: decodedJwt.family_name,
      birthDate: new Date(decodedJwt.birthdate),
      username: decodedJwt.unique_name,
      email: decodedJwt.email,
    });
  }
}
