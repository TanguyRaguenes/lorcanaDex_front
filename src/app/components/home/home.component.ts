import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardsService } from '../../services/cardsService';
import { CardApiLorcast } from '../../models/CardApiLorcast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private cardsService: CardsService) { };



}
