import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TopbarItemComponent } from './topbar-item/topbar-item.component';
import { TopbarButtonComponent } from './topbar-button/topbar-button.component';

@Component({
  selector: 'aef-topbar',
  imports: [
    TopbarItemComponent,
    TopbarButtonComponent,

  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  router = inject(Router);
  model: MenuItem[] = [
    { id: 'bank-account', label: 'Conti', icon: 'pi pi-fw pi-wallet', routerLink: '/' },
    { id: 'operations', label: 'Operazioni', icon: 'pi pi-fw pi-euro', routerLink: '/operations' },
  ];

  onMenuItemClick(item: MenuItem) {
    this.router.navigate([item.routerLink]);
  }
}
