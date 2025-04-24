import { Component, computed, inject, input, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'aef-topbar-item',
  imports: [
    NgClass,
  ],
  templateUrl: './topbar-item.component.html',
  styleUrl: './topbar-item.component.css',
})
export class TopbarItemComponent {
  router = inject(Router);
  item = input.required<MenuItem>();
  index = input.required<number>();
  clickOnMenuItem = output<MenuItem>();

  isActive = computed(() =>
    this.router.url.includes(this.item().routerLink),
  );
}
