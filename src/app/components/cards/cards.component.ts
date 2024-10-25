import { Component, OnInit } from '@angular/core';

import { Card } from '../../models/Card';
import { CardsService } from '../../services/cardsService';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, FiltersComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  // ATTRIBUTS
  private cardsService: CardsService;

  protected cardsToDisplay: Array<Card>;

  // CONSTRUCTEUR
  constructor(cardsService: CardsService) {

    this.cardsService = cardsService;
    this.cardsToDisplay = [];

    this.cardsService.getCardsToDisplay().subscribe({
      next: (response: Array<Card>) => {
        this.cardsToDisplay = [...response]
      }, error: (e => {
        console.log("ngOnInit error " + e)
      })
    });


  }


}


