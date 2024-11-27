import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/Deck';
import { Subscription } from 'rxjs';
import { CardApiLorcast } from '../../models/CardApiLorcast';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';
import { CardComponent } from '../card/card.component';
import { CardService } from '../../services/card.service';
import { DeckCard } from '../../models/DeckCard';


@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [RouterLink, CommonModule, FiltersComponent, CardComponent],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss'
})
export class DeckDetailsComponent implements OnInit, OnDestroy {


  protected deck: Deck = new Deck(null, '', '', new Date(), null, '', '');
  protected deckCards: Array<DeckCard> = [];
  private subscription: Subscription = new Subscription();
  protected deckStats: Map<string, number> = new Map<string, number>();


  constructor(private deckService: DeckService, private cardService: CardService, private router: Router) {

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
        next: (response: Array<DeckCard>) => {
          this.deckCards = response;
          console.log({
            "Update deckCards": this.deckCards
          })
        }, error: (e => {
          console.log("getDeckCards error : " + e)
        })
      })
    )

    this.subscription.add(

      this.deckService.getDeckStats().subscribe({
        next: (response: Map<string, number>) => {
          this.deckStats = response;
          console.log({
            "Update deckStats": this.deckStats
          })
        }, error: (e => {
          console.log("getDeckStats error : " + e)
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


  public getQuantity(cardId: number): number {
    const tempDeckCard: DeckCard = this.deckCards.find(card => card.getCard().getCardIdBdd() == cardId)!;
    return tempDeckCard.getQuantity();
  }

  public getPrice(cardId: number): number {

    const tempDeckCard: DeckCard = this.deckCards.find(card => card.getCard().getCardIdBdd() == cardId)!;

    if (tempDeckCard?.getCard()?.getPrices()?.getUsd()) {
      return Number(tempDeckCard.getCard().getPrices().getUsd());
    }

    return 0;
  }

  public goBack() {
    this.router.navigate(["/decks"]);
  }

}