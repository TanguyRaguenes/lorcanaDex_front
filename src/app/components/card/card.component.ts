import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from '../../services/cardsService';
import { Card } from '../../models/Card';
import { CommonModule } from '@angular/common';
import { CardApiLorcast } from '../../models/CardApiLorcast';
import { CardService } from '../../services/card.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit, OnDestroy {

  protected cardToDisplay: CardApiLorcast | null = null;
  protected isModalVisible: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private cardService: CardService) {

  }

  ngOnInit(): void {
    this.subscription.add(
      this.cardService.getCardToDisplay().subscribe({
        next: (response: CardApiLorcast) => {
          this.cardToDisplay = response
        }, error: (e => {
          console.log("getCardToDisplay error : " + e)
        })
      })

    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  protected toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }


}
