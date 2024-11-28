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
  imports: [RouterLink, CommonModule, FiltersComponent, CardComponent, FormsModule],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss'
})
export class DeckDetailsComponent implements OnInit, OnDestroy {


  protected deck: Deck = new Deck(null, '', '', new Date(), null, '', '');
  protected deckCards: Array<DeckCard> = [];
  private subscription: Subscription = new Subscription();
  protected deckStats: Map<string, number> = new Map<string, number>();

  protected drawnCards: Array<CardApiLorcast> = [];

  protected remainingCards: Array<CardApiLorcast> = [];

  protected isModalVisible: boolean = false;
  protected isDrawStarted = false

  protected nbCardsToDrawOptions: Array<number> = [1, 2, 3, 4, 5, 6, 7]
  protected nbCardsToDrawSelected: number = 1;

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

  public showCardDetails(card: CardApiLorcast) {
    this.cardService.setCardToDisplay(card);
  }

  public getLabel(key: string): string {
    return key.substring(5, key.length) !== '' ? key.substring(5, key.length) : 'Empty';
  }

  public getSortedCategory(prefix: string): { key: string; value: number }[] {
    const statsArray = Array.from(this.deckStats.entries()) // Transforme la Map en tableau
      .filter(([key, value]) => key.startsWith(prefix)) // Filtre les clés avec le préfixe donné
      .map(([key, value]) => ({ key, value: value || 0 })) // Crée des objets avec clé et valeur
      .sort((a, b) => b.value - a.value); // Trie par valeur décroissante

    return statsArray;
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


  public drawCards(): void {




    const tempArray: Array<CardApiLorcast> = [];


    if (!this.isDrawStarted) {

      this.deckCards.forEach(deckCard => {
        for (let i = 0; i < deckCard.getQuantity(); i++) {
          this.remainingCards.push(deckCard.getCard())
        }
      })

      for (let i = this.remainingCards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [this.remainingCards[i], this.remainingCards[randomIndex]] = [this.remainingCards[randomIndex], this.remainingCards[i]];
      }

      console.log("remainingCards.length : " + this.remainingCards.length)

      this.isDrawStarted = true;
    }



    this.remainingCards.splice(0, this.nbCardsToDrawSelected)
    tempArray.push(...this.remainingCards.slice(0, this.nbCardsToDrawSelected))


    console.log({
      drawnCards: this.drawnCards

    })
    this.drawnCards = tempArray;

  }

  public resetDraw(): void {

    this.isDrawStarted = false;
  }




  public toggleModal(): void {

    this.isModalVisible = !this.isModalVisible

  }

}
