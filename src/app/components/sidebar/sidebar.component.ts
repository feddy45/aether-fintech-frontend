import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'aef-sidebar',
  imports: [
    SidebarItemComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  router = inject(Router);
  model: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/' },
    { id: 'wallet', label: 'Wallet', icon: 'pi pi-fw pi-wallet', routerLink: 'wallet' },
  ];

  onMenuItemClick(item: MenuItem) {
    this.router.navigate([item.routerLink]);
  }
}
