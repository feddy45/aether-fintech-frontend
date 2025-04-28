import { Transaction } from '../models/transaction';

export const mockedBankAccounts = [
  { id: '1', name: 'Account 1', iban: 'IT60X0542811101000000123460', balance: 1000 },
  { id: '2', name: 'Account 2', balance: 2000, iban: 'IT60X0542811101000000123464' },
];

export const transactionsMock: Transaction[] = [
  {
    id: '1',
    amount: 150.75,
    date: new Date('2024-10-01'),
    description: 'Pagamento bolletta luce',
    type: 'expense',
  },
  {
    id: '2',
    amount: 2000.0,
    date: new Date('2024-10-05'),
    description: 'Stipendio mensile',
    type: 'income',
  },
  {
    id: '3',
    amount: 50.0,
    date: new Date('2024-10-10'),
    description: 'Ricarica telefonica',
    type: 'expense',
  },
  {
    id: '4',
    amount: 300.0,
    date: new Date('2024-10-15'),
    description: 'Bonifico a Mario Rossi',
    type: 'transfer',
  },
];
