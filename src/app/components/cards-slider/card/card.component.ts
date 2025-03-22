import { Component, computed, inject, input } from '@angular/core';
import { Card } from '../../../models/card';
import { UserService } from '../../../services/user/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'aef-card',
  imports: [
    DatePipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  userService = inject(UserService);
  card = input.required<Card>();
  cardNumberSplit = computed(() => this.card().number.match(/.{1,4}/g));
}
