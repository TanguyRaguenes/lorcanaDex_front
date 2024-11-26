import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/Deck';
import { Subscription } from 'rxjs';
import { CardApiLorcast } from '../../models/CardApiLorcast';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';
import { CardComponent } from '../card/card.component';
import { CardService } from '../../services/card.service';


@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [RouterLink, CommonModule, FiltersComponent, CardComponent],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss'
})
export class DeckDetailsComponent implements OnInit, OnDestroy {


  protected deck: Deck = new Deck(null, '', '', new Date(), null, '', '');
  protected deckCards: Array<CardApiLorcast> = [];
  private subscription: Subscription = new Subscription();


  constructor(private deckService: DeckService, private cardService: CardService) {

  }

  ngOnInit(): void {

    this.subscription.add(
      this.deckService.getDeck().subscribe({
        next: (response: Deck) => {
          this.deck = response;
          console.log({
            "Update deck": this.deck
          })
        }, error: (e => {
          console.log("getDeck error : " + e)
        })
      })
    )

    this.subscription.add(
      this.deckService.getDeckCards().subscribe({
        next: (response: Array<CardApiLorcast>) => {
          this.deckCards = response;
          console.log({
            "Update deckCards": this.deckCards
          })
        }, error: (e => {
          console.log("getDeckCards error : " + e)
        })
      })
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  showCardDetails(card: CardApiLorcast) {
    this.cardService.setCardToDisplay(card);
  }


}
