import { Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { OperationsComponent } from './components/operations/operations.component';
import { NewOperationComponent } from './components/operations/new-operation/new-operation.component';

export const routes: Routes = [
  {
    title: 'Le tue carte',
    path: '',
    component: CardsComponent,
  },
  {
    title: 'Operazioni',
    path: 'operations',
    component: OperationsComponent,
  },
  {
    title: 'Nuova operazione',
    path: 'operations/new-operation',
    component: NewOperationComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
