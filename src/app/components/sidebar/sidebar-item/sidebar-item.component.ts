import { Component, computed, inject, input, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'aef-sidebar-item',
  imports: [
    NgClass,
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css',
})
export class SidebarItemComponent {
  router = inject(Router);
  item = input.required<MenuItem>();
  index = input.required<number>();
  clickOnMenuItem = output<MenuItem>();

  isActive = computed(() =>
    this.router.url.includes(this.item().routerLink),
  );
}
