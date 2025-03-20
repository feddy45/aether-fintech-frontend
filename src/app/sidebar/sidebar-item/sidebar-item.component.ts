import { Component, computed, inject, input, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'aef-sidebar-item',
  imports: [
    NgClass,
  ],
  animations: [
    trigger('children', [
      state(
        'collapsed',
        style({
          height: '0',
        }),
      ),
      state(
        'expanded',
        style({
          height: '*',
        }),
      ),
      transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css',
})
export class SidebarItemComponent {
  router = inject(Router);
  item = input.required<MenuItem>();
  index = input.required<number>();
  onClick = output<MenuItem>();

  isActive = computed(() =>
    this.router.isActive(this.item().routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    }),
  );


  itemClick(event: Event) {
    event.stopPropagation();
    if (this.item().disabled || !this.item().command) return;

    this.item().command?.({ originalEvent: event, item: this.item() });
  }
}
