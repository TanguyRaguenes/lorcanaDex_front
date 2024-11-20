import { Component } from '@angular/core';
import { CardsService } from '../../services/cardsService';
import { CardApiLorcast } from '../../models/CardApiLorcast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private cardsService: CardsService;

  constructor(cardsService: CardsService) {

    this.cardsService = cardsService;

    this.cardsService.getCardsToDisplay().subscribe({

      next: (response: Array<CardApiLorcast>) => {
        console.log({
          "home_request_cards": response
        })

      }, error: (e => {
        console.log("getCardsToDisplay() error " + e)
      })

    })
  }

}
