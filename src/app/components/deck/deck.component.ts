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
  protected deckCardsMap: Map<String, number> = new Map();
  protected deckCardsArray: Array<Card> = [];
  protected deckColors: Array<string | undefined> = [];


  protected cardsPool: Array<Card>;
  protected cardsToDisplay: Array<Card>;

  protected isDeckVisible: boolean;


  private router: Router;
  private cardsService: CardsService;
  private deckService: DeckService;

  protected showDeckList: boolean;

  @ViewChild(CardComponent) cardComponent!: CardComponent;


  // CONSTRUCTEUR

  constructor(router: Router, cardsService: CardsService, deckService: DeckService) {

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
    // console.log(this.deckColors);


  }
  ngOnInit(): void {
    this.cardsService.getCardsToDisplay().subscribe({
      next: (response: Array<Card>) => {
        this.cardsPool = [...response.filter(e => this.deckColors.includes(e.getColor()))];
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

  protected addCardToDeck(uniqueId: string): void {


    // const cardFiltered: Card = this.cardsService.getAllCards().filter(e => e.getUniqueId() === uniqueId)[0];

    const numberOfCopies: number = this.getCardNumberOfCopies(uniqueId);


    numberOfCopies < 4 ? this.deckCardsMap.set(uniqueId, numberOfCopies + 1) : null;

    console.log(this.deckCardsMap);

  }

  //ENLEVER UNE CARTE AU DECK

  protected removeCardFromDeck(uniqueId: string): void {

    let numberOfCopies: number = this.getCardNumberOfCopies(uniqueId);

    numberOfCopies > 1 ? this.deckCardsMap.set(uniqueId, numberOfCopies - 1) : this.deckCardsMap.delete(uniqueId);

    console.log(this.deckCardsMap);

  }

  // RECUPERATION NB EXEMPLAIRES CARTE DANS DECK

  protected getCardNumberOfCopies(uniqueId: string): number {
    return this.deckCardsMap.get(uniqueId) || 0;
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
      const card: Card | undefined = this.cardsService.getAllCards().find(e => e.getUniqueId() === key);
      if (card) {
        this.deckCardsArray.push(card);
      }
    })
  }

  // AFFICHAGE DETAILS CARTE

  showCardDetails(card: Card) {
    this.cardComponent.setCardToDisplay(card);
  }


  //SAUVEGARDE DES CARTES DU DECK DANS LA BDD

  protected saveDeckCardsInBdd() {
    this.updateDeckCardsArray();
    this.deckService.saveDeckCardsInBdd(this.deckSelected?.getDeckId()!, this.deckCardsArray).subscribe({
      next: (response: any) => {
        console.log(response);
      }, error: (e => {
        console.log("Erreur lors de la sauvegarde des cartes du deck : " + e)
      })
    })

  }

}
