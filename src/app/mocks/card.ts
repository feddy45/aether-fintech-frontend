import { Card } from '../models/card';

export const cardsMock: Card[] = [
  {
    id: '1',
    description: 'Card 1',
    number: '1234-5678-9012-3456',
    expirationDate: new Date('2025-12-31'),
  },
  {
    id: '2',
    description: 'Card 2',
    number: '4563-5678-1234-3456',
    expirationDate: new Date('2025-12-31'),
  },
];
