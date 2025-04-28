import { User } from '../models/user';

export const userMock: User = {
  id: '1',
  username: 'mrossi',
  firstName: 'Mario',
  lastName: 'Rossi',
  birthDate: new Date('1990-01-01'),
  email: 'mario.rossi@gmail.com',
};
