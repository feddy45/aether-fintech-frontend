import { BankTransfer } from '../models/bank-transfer';

export const bankTransfersMock: BankTransfer[] = [
  {
    id: '1',
    iban: 'IT60X0542811101000000123456',
    beneficiary: 'Mario Rossi',
    amount: 150.0,
    description: 'Pagamento affitto ottobre',
  },
  {
    id: '2',
    iban: 'IT60X0542811101000000789012',
    beneficiary: 'Luigi Bianchi',
    amount: 200.5,
    description: 'Rimborso spese viaggio',
  },
  {
    id: '3',
    iban: 'IT60X0542811101000000345678',
    beneficiary: 'Carla Verdi',
    amount: 75.25,
    description: 'Acquisto regalo compleanno',
  },
  {
    id: '4',
    iban: 'IT60X0542811101000000567890',
    beneficiary: 'Giulia Neri',
    amount: 500.0,
    description: 'Pagamento fattura consulenza',
  },
  {
    id: '5',
    iban: 'IT60X0542811101000000987654',
    beneficiary: 'Francesco Gialli',
    amount: 120.75,
    description: 'Donazione beneficenza',
  },
];
