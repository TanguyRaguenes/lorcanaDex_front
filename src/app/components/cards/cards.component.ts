import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Card } from '../../models/Card';
import { CardsService } from '../../services/cardsService';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';
import { CardComponent } from '../card/card.component';
import { CardApiLorcast } from '../../models/CardApiLorcast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, FiltersComponent, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit, OnDestroy {

  // ATTRIBUTS
  protected cardsToDisplay: Array<CardApiLorcast> = [];
  private subscription: Subscription = new Subscription();

  @ViewChild(CardComponent) cardComponent!: CardComponent;

  // CONSTRUCTEUR
  constructor(private cardsService: CardsService) { };

  ngOnInit(): void {

    this.cardsService.resetColors();

    this.subscription.add(
      this.cardsService.getCardsToDisplay().subscribe({
        next: (response: Array<CardApiLorcast>) => {
          console.log({
            "cards_request_cards": response
          })
          this.cardsToDisplay = [...response]
        }, error: (e => {
          console.log("getCardsToDisplay() error " + e)
        })
      })
    );


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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


