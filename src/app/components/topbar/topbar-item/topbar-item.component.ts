import { Component, inject, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aef-topbar-item',
  imports: [
    NgClass,
  ],
  templateUrl: './topbar-item.component.html',
  styleUrl: './topbar-item.component.css',
})
export class TopbarItemComponent implements OnInit, OnDestroy {
  router = inject(Router);
  item = input.required<MenuItem>();
  clickOnMenuItem = output<MenuItem>();

  isActive = signal<boolean>(false);
  routerSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.selectItemByCurrentRoute();
    this.routerSubscription = this.router.events.subscribe(() => {
      this.selectItemByCurrentRoute();
    });
  }

  selectItemByCurrentRoute() {
    this.isActive.set(this.router.url.includes(this.item().routerLink));
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
