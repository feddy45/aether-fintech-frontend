import { Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { OperationsComponent } from './components/operations/operations.component';

export const routes: Routes = [
  {
    title: 'Le tue carte',
    path: '',
    pathMatch: 'full',
    component: CardsComponent,
  },
  {
    title: 'Operazioni',
    path: 'operations',
    pathMatch: 'full',
    component: OperationsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
