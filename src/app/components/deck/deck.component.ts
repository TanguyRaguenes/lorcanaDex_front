import { Component, ViewChild } from '@angular/core';
import { Deck } from '../../models/Deck';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardsComponent } from '../cards/cards.component';
import { Card } from '../../models/Card';
import { CardsService } from '../../services/cardsService';
import { Filter } from '../../models/Filter';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltersComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent {


  // ATTRIBUTS

  protected deckSelected: Deck | null = null;
  protected deckCardsMap: Map<String, number> = new Map();
  protected deckCardsArray: Array<Card> = [];
  protected deckColors: Array<string | undefined> = [];

  protected cardsToDisplay: Array<Card>;


  private router: Router;
  private cardsService: CardsService;

  protected showDeckList: boolean;


  // CONSTRUCTEUR

  constructor(router: Router, cardsService: CardsService) {

    this.router = router;
    this.cardsService = cardsService;
    this.cardsToDisplay = [...this.cardsService.getFilteredCards()];


    this.showDeckList = false;

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


  }


  public goBack() {
    this.router.navigate(["/decks"])
  }


  // public addCardToDeck(uniqueId: string): void {

  //   const cardFiltered: Card = this.cardsStorage.filter(e => e.getUniqueId() === uniqueId)[0];

  //   const numberOfCopies: number = this.deckCardsMap.get(uniqueId) || 0;



  //   if (numberOfCopies < 4 && this.deckColors.includes(cardFiltered.getColor() + ".png")) {
  //     console.log("ajout")
  //     this.deckCardsMap.set(uniqueId, numberOfCopies + 1);

  //   } else {
  //     console.log("pas d'ajout")
  //   }

  //   console.log(this.deckCardsMap);

  // }

  // public removeCardFromDeck(uniqueId: string): void {

  //   let numberOfCopies: number = this.deckCardsMap.get(uniqueId) || 0;

  //   if (numberOfCopies > 1) {
  //     console.log("retranche")
  //     this.deckCardsMap.set(uniqueId, numberOfCopies - 1);
  //   } else {
  //     this.deckCardsMap.delete(uniqueId);
  //     console.log("suppression")
  //   }

  //   console.log(this.deckCardsMap);

  // }

  // public getCardNumberOfCopies(uniqueId: string): number {
  //   return this.deckCardsMap.get(uniqueId) || 0;
  // }

  // public toggleShowDeckList() {

  //   console.log("show");

  //   const deckListDiv = document.getElementById("deckListDiv") as HTMLDivElement;

  //   if (deckListDiv.classList.contains("h-16")) {
  //     deckListDiv.classList.add("h-full");
  //     deckListDiv.classList.remove("hover:scale-125")
  //     deckListDiv.classList.remove("h-16");
  //     this.updateDeckCardsArray()
  //     this.showDeckList = true;

  //   } else {
  //     deckListDiv.classList.remove("h-full");
  //     deckListDiv.classList.add("hover:scale-125")
  //     deckListDiv.classList.add("h-16");
  //     this.showDeckList = false;
  //   }



  // }

  // public updateDeckCardsArray() {
  //   this.deckCardsArray = [];
  //   this.deckCardsMap.forEach((value, key) => {
  //     const card: Card | undefined = this.cardsStorage.find(e => e.getUniqueId() === key);
  //     if (card) {
  //       this.deckCardsArray.push(card);
  //     }
  //   })
  // }

}
