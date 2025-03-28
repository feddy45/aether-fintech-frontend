import { HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Observable } from 'rxjs';

export const apiTokenAuthenticationInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const apiToken =
    '8pqj89xryzt62llm9de55qkk6hqes17fevs5luzl3gh0haxsbo1y2vsq6m2c567z';
  return next(req.clone({ headers: req.headers.set('apiToken', apiToken) }));
};

export const provideHttpClientWithAuthentication = () =>
  provideHttpClient(withInterceptors([apiTokenAuthenticationInterceptor]));
