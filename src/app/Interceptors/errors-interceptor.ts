import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorsInterceptor implements HttpInterceptor {
  messageService = inject(MessageService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log('Errore', error);
          const errorMsg =
            error.error ?? 'Errore durante la comunicazione con il backend.';
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
