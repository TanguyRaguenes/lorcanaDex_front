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
          console.log({
            "Update cardToDisplay": this.cardToDisplay
          })
        }, error: (e => {
          console.log("getCardToDisplay error : " + e)
        })
      })

    )

    this.subscription.add(
      this.cardService.getIsModalVisible().subscribe({
        next: (response: boolean) => {
          this.isModalVisible = response
          console.log({
            "Update isModalVisible": this.isModalVisible
          })
        }, error: (e => {
          console.log("getIsModalVisible error : " + e)
        })
      })

    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  protected toggleModal() {
    this.cardService.toggleModal();
  }


}
