import { Component, computed, inject, input, output } from '@angular/core';
import { Card } from '../../models/card';
import { DatePipe, NgClass } from '@angular/common';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'aef-card',
  imports: [
    DatePipe,
    NgClass,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  authService = inject(AuthenticationService);
  card = input.required<Card>();
  isSelected = input<boolean>(false);
  cardClicked = output();

  cardNumberSplit = computed(() => this.card().number.match(/.{1,4}/g));
}
