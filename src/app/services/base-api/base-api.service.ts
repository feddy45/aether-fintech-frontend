import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiService<T> {

  abstract getAll(): Observable<T[]>;
}
