import { Routes } from '@angular/router';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { OperationsComponent } from './components/operations/operations.component';
import { NewOperationComponent } from './components/operations/new-operation/new-operation.component';
import { AuthenticationGuard } from './guards/authentication-guard';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        title: 'Le tue carte',
        path: '',
        component: BankAccountComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        title: 'Operazioni',
        path: 'operations',
        component: OperationsComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        title: 'Nuova operazione',
        path: 'operations/new-operation',
        component: NewOperationComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: '**',
        redirectTo: '',
        canActivate: [AuthenticationGuard],
      },
    ],
  },
];
