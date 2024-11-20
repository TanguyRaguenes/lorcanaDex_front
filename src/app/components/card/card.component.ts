import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from '../../services/cardsService';
import { Card } from '../../models/Card';
import { CommonModule } from '@angular/common';
import { CardApiLorcast } from '../../models/CardApiLorcast';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  protected cardToDisplay: CardApiLorcast | null;
  protected isModalVisible: boolean;

  constructor() {
    this.cardToDisplay = null;
    this.isModalVisible = false;
  }

  public setCardToDisplay(card: CardApiLorcast) {
    this.cardToDisplay = card;
    // console.log({
    //   "cardToDisplay : ": this.cardToDisplay
    // })
    this.toggleModal();
  }

  protected toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }


}
