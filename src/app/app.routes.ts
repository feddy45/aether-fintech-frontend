import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WalletComponent } from './wallet/wallet.component';

export const routes: Routes = [
  {
    title: 'Dasboard',
    path: '',
    component: DashboardComponent,
  },
  {
    title: 'Wallet',
    path: 'wallet',
    component: WalletComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
