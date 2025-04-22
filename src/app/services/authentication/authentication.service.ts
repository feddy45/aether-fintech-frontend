import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../../models/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router = inject(Router);
  http = inject(HttpClient);
  private readonly tokenKey = 'auth_token';

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

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', loginRequest);
  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }
}
