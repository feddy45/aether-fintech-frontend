import { Component, computed, inject, input } from '@angular/core';
import { Card } from '../../models/card';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'aef-card',
  imports: [
    DatePipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  authService = inject(AuthenticationService);
  card = input.required<Card>();
  cardNumberSplit = computed(() => this.card().number.match(/.{1,4}/g));
}
