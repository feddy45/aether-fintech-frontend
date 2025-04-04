import { inject, Injectable } from '@angular/core';
import { BaseApiService } from '../base-api/base-api.service';
import { Contact } from '../../models/contact';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface GetContactsResponse {
  contacts: Contact[];
}

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends BaseApiService<Contact> {
  http = inject(HttpClient);

  getAll(): Observable<Contact[]> {
    return this.http.get<GetContactsResponse>('/api/contacts').pipe(map(res => res.contacts));
  }
}
