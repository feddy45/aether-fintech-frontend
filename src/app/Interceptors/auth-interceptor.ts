import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthenticationService);
  router = inject(Router);
  messageService = inject(MessageService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
        } else if (error.status === 400) {
          const errorMsg =
            error.error?.message ?? 'Errore durante la comunicazione con il backend.';
          this.messageService.add({
            severity: 'error',
            summary: 'Errore',
            detail: errorMsg,
          });
        }

        return throwError(() => error);
      }),
    );
  }
}
