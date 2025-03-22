import { Injectable, signal } from '@angular/core';
import { BaseApiService } from '../base-api/base-api.service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiService<User> {
  user = signal<User>({
    id: 1,
    firstName: 'Federico',
    lastName: 'Ghezzo',
    birthDate: new Date(1995, 2, 8),
    email: 'feddy45@gmail.com',
  });

}
