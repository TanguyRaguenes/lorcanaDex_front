import { Component, ViewChild } from '@angular/core';

import { Card } from '../../models/Card';
import { CardsService } from '../../services/cardsService';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';
import { CardComponent } from '../card/card.component';
import { CardApiLorcast } from '../../models/CardApiLorcast';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, FiltersComponent, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  // ATTRIBUTS
  private cardsService: CardsService;
  protected cardsToDisplay: Array<CardApiLorcast>;

  @ViewChild(CardComponent) cardComponent!: CardComponent;

  // CONSTRUCTEUR
  constructor(cardsService: CardsService) {

    this.cardsService = cardsService;
    this.cardsService.resetColors();
    this.cardsToDisplay = [];

    this.cardsService.getCardsToDisplay().subscribe({
      next: (response: Array<CardApiLorcast>) => {
        console.log({
          "Response": response
        })
        this.cardsToDisplay = [...response]
      }, error: (e => {
        console.log("ngOnInit error " + e)
      })
    });


  }

  // AFFICHAGE DETAILS CARTE

  showCardDetails(card: CardApiLorcast) {
    this.cardComponent.setCardToDisplay(card);
  }


  showPrices(cardId: string) {
    console.log({
      cardId: cardId
    })

    const priceContainer = document.getElementById(cardId) as HTMLElement

    console.log(priceContainer)

    priceContainer.classList.remove("hidden")
    setTimeout(() => {
      priceContainer.classList.add("hidden")
    }, 2000)
  }


}


