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
    { id: 'cards', label: 'Le tue carte', icon: 'pi pi-fw pi-wallet', routerLink: '/' },
    { id: 'operations', label: 'Operazioni', icon: 'pi pi-fw pi-euro', routerLink: '/operations' },
  ];

  onMenuItemClick(item: MenuItem) {
    this.router.navigate([item.routerLink]);
  }
}
