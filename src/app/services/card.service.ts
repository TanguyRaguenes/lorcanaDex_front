import { Injectable } from '@angular/core';
import { CardApiLorcast } from '../models/CardApiLorcast';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardToDisplay: BehaviorSubject<CardApiLorcast> = new BehaviorSubject<CardApiLorcast>(new CardApiLorcast(""));

  constructor() { }

  public setCardToDisplay(card: CardApiLorcast): void {
    this.cardToDisplay.next(card);
  }

  public getCardToDisplay(): Observable<CardApiLorcast> {
    return this.cardToDisplay;
  }
}
