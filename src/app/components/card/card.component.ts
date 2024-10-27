import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from '../../services/cardsService';
import { Card } from '../../models/Card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  protected cardToDisplay: Card | null;
  protected isModalVisible: boolean;

  constructor() {
    this.cardToDisplay = null;
    this.isModalVisible = false;
  }

  public setCardToDisplay(card: Card) {
    this.cardToDisplay = card;
    // console.log({
    //   "cardToDisplay : ": this.cardToDisplay
    // })
    this.toggleIsModalVisible();
  }

  protected toggleIsModalVisible() {
    this.isModalVisible = !this.isModalVisible;
  }


}
