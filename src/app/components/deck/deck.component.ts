import { Component } from '@angular/core';
import { Deck } from '../../models/Deck';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent {

  protected deckSelected: Deck | null = null;

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


  }


  public goBack() {
    this.router.navigate(["/decks"])
  }


}
