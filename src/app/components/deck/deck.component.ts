import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Deck } from '../../models/Deck';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Card } from '../../models/Card';
import { CardsService } from '../../services/cardsService';
import { Filter } from '../../models/Filter';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';
import { CardComponent } from '../card/card.component';
import { DecksService } from '../../services/decks.service';
import { DeckService } from '../../services/deck.service';
import { map, Subscription } from 'rxjs';
import { FlashMessageService } from '../../services/flash-message.service';
import { CardApiLorcast } from '../../models/CardApiLorcast';
import { CardService } from '../../services/card.service';
import { DeckCard } from '../../models/DeckCard';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltersComponent, CardComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent implements OnInit, OnDestroy {



  private subscription: Subscription = new Subscription();

  // ATTRIBUTS

  protected deckSelected: Deck | null = null;
  protected deckCardsMap: Map<number, number> = new Map();
  protected deckCardsArray: Array<CardApiLorcast> = [];
  protected deckColors: Array<string | undefined> = [];


  protected cardsPool: Array<CardApiLorcast> = [];
  protected cardsToDisplay: Array<CardApiLorcast> = [];

  protected isDeckVisible: boolean = false;
  protected showDeckList: boolean = false;

  protected deckStats: Map<string, number> = new Map<string, number>();

  protected deckCards: Array<DeckCard> = [];

  // CONSTRUCTEUR

  constructor(private router: Router, private cardService: CardService, private cardsService: CardsService, private deckService: DeckService, private flashMessageService: FlashMessageService) {

  }

  ngOnInit(): void {

    this.subscription.add(

      this.deckService.getDeck().subscribe({
        next: (response: Deck) => {

          this.deckColors = [response.getFirstInk(), response.getSecondInk()];
          this.cardsService.setColors(this.deckColors);
          this.deckSelected = response;

          console.log({
            "update deck": this.deckCards,
            "update deckColors": this.deckCardsMap
          })

        }, error: (e => {
          console.log("getDeck error : " + e)
        })
      })


    )

    this.subscription.add(
      this.deckService.getDeckCards().subscribe({
        next: (response: Array<DeckCard>) => {
          this.deckCards = [...response]

          this.deckCards.forEach(deckCard => {
            this.deckCardsMap.set(deckCard.getCard().getCardIdBdd(), deckCard.getQuantity())
          })

          console.log({
            "update deckCards": this.deckCards,
            "update deckCardsMap": this.deckCardsMap
          })

        }, error: (e => {
          console.log("getDeckCards error : " + e)
        })
      })


    )

    this.subscription.add(

      this.cardsService.getCardsToDisplay().subscribe({
        next: (response: Array<CardApiLorcast>) => {
          console.log({
            "response getCardsToDisplay": response
          })

          console.log({
            "deckColors": this.deckColors
          })

          let responseTemp: Array<CardApiLorcast> = response.filter(card => !card.getSet().getName().includes("Promo"))
          responseTemp = responseTemp.filter(card => !card.getSet().getName().includes("D23"))
          responseTemp = responseTemp.filter(e => this.deckColors.includes(e.getInk()))
          this.cardsPool = [...responseTemp];
          this.cardsToDisplay = [...this.cardsPool];
          console.log({
            "update cardsToDisplay": this.cardsToDisplay,
            "update cardsPool": this.cardsPool
          })
        }, error: (e => {
          console.log("getCardsToDisplay error : " + e)
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


  // METHODES



  // RETOUR A L'ECRAN DES DECKS

  protected goBack() {
    this.router.navigate(["/decks"])
  }


  // AJOUTER UNE CARTE AU DECK

  protected addCardToDeck(cardId: number): void {


    // const cardFiltered: Card = this.cardsService.getAllCards().filter(e => e.getUniqueId() === uniqueId)[0];

    const numberOfCopies: number = this.getCardNumberOfCopies(cardId);

    // if (this.getDeckNumberOfCards() < 60) {

    if (numberOfCopies < 4) {
      this.deckCardsMap.set(cardId, numberOfCopies + 1)
    } else {
      this.flashMessageService.setMessageType("information")
      this.flashMessageService.setMessageText("You can only have 4 copies of a card.", true)
    }

    // } else {

    //   this.flashMessageService.setMessageType("information")
    //   this.flashMessageService.setMessageText("You can only have 60 cards in your deck.", true)

    // }



    console.log(this.deckCardsMap);

  }

  protected getDeckNumberOfCards(): number {

    let nbOfCards: number = 0;

    for (const [key, value] of this.deckCardsMap) {
      nbOfCards += value;
    }

    console.log("nbOfCards : " + nbOfCards);
    return nbOfCards;

  }

  //ENLEVER UNE CARTE AU DECK

  protected removeCardFromDeck(cardId: number): void {

    let numberOfCopies: number = this.getCardNumberOfCopies(cardId);

    if (numberOfCopies == 0) {
      this.flashMessageService.setMessageType("information")
      this.flashMessageService.setMessageText("You have zero copies of this card in your deck.", true)
    }

    numberOfCopies > 1 ? this.deckCardsMap.set(cardId, numberOfCopies - 1) : this.deckCardsMap.delete(cardId);

    console.log(this.deckCardsMap);

  }

  // RECUPERATION NB EXEMPLAIRES CARTE DANS DECK

  protected getCardNumberOfCopies(cardId: number): number {
    return this.deckCardsMap.get(cardId) || 0;
  }


  //AFFICHAGE DES CARTES DU DECK

  protected toggleShowDeck() {

    if (!this.isDeckVisible) {
      console.log("showDeck");
      this.updateDeckCardsArray();
      this.cardsToDisplay = [...this.deckCardsArray]
      this.isDeckVisible = true;
    } else {
      console.log("showAll");
      this.cardsToDisplay = [...this.cardsPool];
      this.isDeckVisible = false;
    }

  }

  protected updateDeckCardsArray() {
    this.deckCardsArray = [];
    this.deckCardsMap.forEach((value, key) => {
      const card: CardApiLorcast | undefined = this.cardsService.getCardsAll().find(e => e.getCardIdBdd() === key);
      if (card) {
        this.deckCardsArray.push(card);
      }
    })
  }

  // AFFICHAGE DETAILS CARTE

  showCardDetails(card: CardApiLorcast) {
    this.cardService.setCardToDisplay(card);
  }


  //SAUVEGARDE DES CARTES DU DECK DANS LA BDD

  protected saveDeckCardsInBdd() {
    this.updateDeckCardsArray();

    console.log({

      "this.deckSelected?.getDeckId()": this.deckSelected?.getDeckId(),
      "this.deckCardsMap": this.deckCardsMap

    })
    this.deckService.saveDeckCardsInBdd(this.deckSelected?.getDeckId()!, this.deckCardsMap).subscribe({
      next: (response: any) => {
        console.log(response);
        this.flashMessageService.setMessageType("success")
        this.flashMessageService.setMessageText("The backup is a success !", true)
      }, error: (e => {
        this.flashMessageService.setMessageType("error")
        this.flashMessageService.setMessageText("Error saving deck cards.", true)
        console.log("Error saveDeckCardsInBdd : " + e)
      })
    })

  }

}
