import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WalletComponent } from './components/wallet/wallet.component';

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
