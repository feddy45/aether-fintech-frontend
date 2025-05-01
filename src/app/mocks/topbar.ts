import { MenuItem } from 'primeng/api';

export const mockTopbarItem: MenuItem[] = [
  { id: 'bank-account', label: 'Conti', icon: 'pi pi-fw pi-wallet', routerLink: '/bank-accounts' },
  { id: 'operations', label: 'Operazioni', icon: 'pi pi-fw pi-euro', routerLink: '/operations' },
];
