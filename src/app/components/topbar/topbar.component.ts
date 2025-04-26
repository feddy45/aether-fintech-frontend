import { Component, inject } from '@angular/core';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TopbarItemComponent } from './topbar-item/topbar-item.component';
import { Menu } from 'primeng/menu';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'aef-topbar',
  imports: [
    Button,
    TopbarItemComponent,
    Menu,
    Avatar,
    PrimeTemplate,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  authService = inject(AuthenticationService);
  router = inject(Router);
  model: MenuItem[] = [
    { id: 'bank-account', label: 'Conti', icon: 'pi pi-fw pi-wallet', routerLink: '/' },
    { id: 'operations', label: 'Operazioni', icon: 'pi pi-fw pi-euro', routerLink: '/operations' },
  ];

  items: MenuItem[] = [
    { id: 'logout', label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logoutClicked() },
  ];

  onMenuItemClick(item: MenuItem) {
    this.router.navigate([item.routerLink]);
  }

  logoutClicked() {
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
