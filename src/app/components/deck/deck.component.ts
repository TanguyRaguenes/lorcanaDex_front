import { Component, ViewChild } from '@angular/core';
import { Deck } from '../../models/Deck';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardsComponent } from '../cards/cards.component';
import { Card } from '../../models/Card';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent {

  @ViewChild(CardsComponent) cardsComponent!: CardsComponent;

  protected deckSelected: Deck | null = null;
  protected deckCards: Map<String, number> = new Map();
  protected deckInks: Array<string | undefined> = [];

  constructor(private router: Router) {
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

    // this.deckInks = [this.deckSelected?.getFirstInk(), this.deckSelected?.getSecondInk()];
    // this.cardsComponent.cardsStorage = this.cardsComponent.cardsStorage.filter(e => this.deckInks.includes(e.getColor() + ".png"))

  }

  ngAfterViewInit() {
    this.deckInks = [this.deckSelected?.getFirstInk(), this.deckSelected?.getSecondInk()];

    if (this.cardsComponent.cardsStorage) {
      this.cardsComponent.cardsStorage = this.cardsComponent.cardsStorage.filter(e => this.deckInks.includes(e.getColor() + ".png"));
    }
  }


  public goBack() {
    this.router.navigate(["/decks"])
  }


  public addCardToDeck(uniqueId: string): void {

    const cardFiltered: Card = this.cardsComponent.cardsStorage.filter(e => e.getUniqueId() == uniqueId)[0]


    let numberOfCopies: number = this.deckCards.get(uniqueId) || 0;


    if (numberOfCopies < 4 && this.deckInks.includes(cardFiltered.getColor() + ".png")) {
      console.log("ajout")
      this.deckCards.set(uniqueId, numberOfCopies + 1);
    } else {
      console.log("pas d'ajout")
    }

    console.log(this.deckCards);

  }

  public removeCardFromDeck(uniqueId: string): void {

    let numberOfCopies: number = this.deckCards.get(uniqueId) || 0;

    if (numberOfCopies > 1) {
      console.log("retranche")
      this.deckCards.set(uniqueId, numberOfCopies - 1);
    } else {
      this.deckCards.delete(uniqueId);
      console.log("suppression")
    }

    console.log(this.deckCards);

  }

  public getCardNumberOfCopies(uniqueId: string): number {
    return this.deckCards.get(uniqueId) || 0;
  }


}
