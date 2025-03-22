import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService<T> {

  getAll(): Observable<T[]> {
    return of([]);
  }
}
