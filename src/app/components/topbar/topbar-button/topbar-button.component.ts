import { Component, inject } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'aef-topbar-button',
  imports: [
    Avatar,
    Button,
    Menu,
    PrimeTemplate,
  ],
  templateUrl: './topbar-button.component.html',
  styleUrl: './topbar-button.component.css',
})
export class TopbarButtonComponent {
  authService = inject(AuthenticationService);
  
  items: MenuItem[] = [
    { id: 'logout', label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logoutClicked() },
  ];

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
