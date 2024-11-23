import { Component, OnInit, ViewChild } from '@angular/core';
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
import { map } from 'rxjs';
import { FlashMessageService } from '../../services/flash-message.service';
import { CardApiLorcast } from '../../models/CardApiLorcast';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltersComponent, CardComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent implements OnInit {


  // ATTRIBUTS

  protected deckSelected: Deck | null = null;
  protected deckCardsMap: Map<number, number> = new Map();
  protected deckCardsArray: Array<CardApiLorcast> = [];
  protected deckColors: Array<string | undefined> = [];


  protected cardsPool: Array<CardApiLorcast>;
  protected cardsToDisplay: Array<CardApiLorcast>;

  protected isDeckVisible: boolean;


  private router: Router;
  private cardsService: CardsService;
  private deckService: DeckService;
  private flashMessageService: FlashMessageService;

  protected showDeckList: boolean;

  @ViewChild(CardComponent) cardComponent!: CardComponent;


  // CONSTRUCTEUR

  constructor(router: Router, cardsService: CardsService, deckService: DeckService, flashMessageService: FlashMessageService) {

    this.flashMessageService = flashMessageService;

    this.isDeckVisible = false;
    this.router = router;
    this.cardsService = cardsService;
    this.cardsPool = [];
    this.cardsToDisplay = [];
    this.showDeckList = false;

    this.deckService = deckService;

    const data = sessionStorage.getItem("deckSelected");

    if (data) {
      const dataParse = JSON.parse(data);
      this.deckSelected = new Deck(
        dataParse.deckId,
        dataParse.deckName,
        dataParse.username,
        dataParse.creationDate,
        dataParse.updateDate,
        dataParse.firstInk,
        dataParse.secondInk)
    }

    this.deckColors = [this.deckSelected?.getFirstInk(), this.deckSelected?.getSecondInk()];
    this.cardsService.setColors(this.deckColors);


    this.deckService.getDeckCards(this.deckSelected?.getDeckId()!).subscribe({
      next: (response: any) => {

        this.deckCardsMap = response;
        this.updateDeckCardsArray();

      }, error: (e => {
        console.log("getDeckCards error : " + e)
      })
    })
    // console.log(this.deckColors);


  }
  ngOnInit(): void {
    this.cardsService.getCardsToDisplay().subscribe({
      next: (response: Array<CardApiLorcast>) => {
        this.cardsPool = [...response.filter(e => this.deckColors.includes(e.getInk()))];
        this.cardsToDisplay = [...this.cardsPool];
      }, error: (e => {
        console.log("ngOnInit error " + e)
      })
    });
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

    if (this.getDeckNumberOfCards() < 60) {

      if (numberOfCopies < 4) {
        this.deckCardsMap.set(cardId, numberOfCopies + 1)
      } else {
        this.flashMessageService.setMessageType("information")
        this.flashMessageService.setMessageText("You can only have 4 copies of a card.", true)
      }

    } else {

      this.flashMessageService.setMessageType("information")
      this.flashMessageService.setMessageText("You can only have 60 cards in your deck.", true)

    }



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

  protected showDeck() {
    console.log("showDeck");
    this.updateDeckCardsArray();
    this.cardsToDisplay = [...this.deckCardsArray]
    this.isDeckVisible = true;
  }


  //AFFICHAGE DE TOUTES LES CARTES

  protected showAll() {
    console.log("showAll");
    this.cardsToDisplay = [...this.cardsPool];
    this.isDeckVisible = false;

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
    this.cardComponent.setCardToDisplay(card);
  }


  //SAUVEGARDE DES CARTES DU DECK DANS LA BDD

  protected saveDeckCardsInBdd() {
    this.updateDeckCardsArray();
    this.deckService.saveDeckCardsInBdd(this.deckSelected?.getDeckId()!, this.deckCardsMap).subscribe({
      next: (response: any) => {
        console.log(response);
        this.flashMessageService.setMessageType("success")
        this.flashMessageService.setMessageText("The backup is a success", true)
      }, error: (e => {
        this.flashMessageService.setMessageType("error")
        this.flashMessageService.setMessageText("Error saving deck cards", true)
        console.log("Error saveDeckCardsInBdd : " + e)
      })
    })

  }

}
