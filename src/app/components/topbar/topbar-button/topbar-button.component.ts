import { Component, inject, signal } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';

@Component({
  selector: 'aef-topbar-button',
  imports: [
    Avatar,
    Button,
    Menu,
    PrimeTemplate,
    ChangePasswordDialogComponent,
    SuccessDialogComponent,
  ],
  templateUrl: './topbar-button.component.html',
  styleUrl: './topbar-button.component.css',
})
export class TopbarButtonComponent {
  authService = inject(AuthenticationService);
  changePasswordModalVisible = signal<boolean>(false);
  confirmDialogVisible = signal<boolean>(false);

  items: MenuItem[] = [
    {
      id: 'change-password',
      label: 'Cambia password',
      icon: 'pi pi-fw pi-key',
      command: () => this.changePasswordModalVisible.set(true),
    },
    { id: 'logout', label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout() },
  ];

  passwordChanged() {
    this.changePasswordModalVisible.set(false);
    this.confirmDialogVisible.set(true);
  }

  logout() {
    this.confirmDialogVisible.set(false);
    this.authService.logout();
  }


  getUserLabel() {
    const user = this.authService.user();
    if (user) {
      return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
    }
    return '';
  }
}
