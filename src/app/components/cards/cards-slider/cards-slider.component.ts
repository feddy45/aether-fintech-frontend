import { Component, inject, model, OnInit, signal } from '@angular/core';
import { CardService } from '../../../services/card/card.service';
import { Card } from '../../../models/card';
import { CardComponent } from './card/card.component';
import { Carousel, CarouselPageEvent } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'aef-cards-slider',
  imports: [
    CardComponent,
    Carousel,
    PrimeTemplate,
  ],
  templateUrl: './cards-slider.component.html',
  styleUrl: './cards-slider.component.css',
})
export class CardsSliderComponent implements OnInit {
  cardService = inject(CardService);
  cards = signal<Card[]>([]);
  cardSelected = model<Card>();

  ngOnInit() {
    this.cardService.getAll().subscribe(cards => {
      this.cards.set(cards);
      this.cardSelected.set(this.cards()[0]);
    });
  }

  onPageChanged(event: CarouselPageEvent) {
    if (!!event.page && this.cards()) this.cardSelected.set(this.cards()[event.page]);
  }
}
