import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardsService } from '../../services/cardsService';
import { CardApiLorcast } from '../../models/CardApiLorcast';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private cardsService: CardsService, private router: Router) { };


  public showCards(): void {

    this.router.navigate(["cards"])
  }

  public showDecks(): void {

    this.router.navigate(["decks"])
  }

}
