import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TopbarItemComponent } from './topbar-item/topbar-item.component';

@Component({
  selector: 'aef-topbar',
  imports: [
    Button,
    TopbarItemComponent,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  authService = inject(AuthenticationService);
  router = inject(Router);
  model: MenuItem[] = [
    { id: 'cards', label: 'Le tue carte', icon: 'pi pi-fw pi-wallet', routerLink: '/' },
    { id: 'operations', label: 'Operazioni', icon: 'pi pi-fw pi-euro', routerLink: '/operations' },
  ];

  onMenuItemClick(item: MenuItem) {
    this.router.navigate([item.routerLink]);
  }

  logoutClicked() {
    this.authService.logout();
  }
}
