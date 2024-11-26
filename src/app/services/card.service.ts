import { Injectable } from '@angular/core';
import { CardApiLorcast } from '../models/CardApiLorcast';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardToDisplay: BehaviorSubject<CardApiLorcast> = new BehaviorSubject<CardApiLorcast>(new CardApiLorcast(""));
  private isModalVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setCardToDisplay(card: CardApiLorcast): void {
    this.cardToDisplay.next(card);
    this.toggleModal();
  }

  public getCardToDisplay(): Observable<CardApiLorcast> {
    return this.cardToDisplay;
  }

  public toggleModal(): void {
    this.isModalVisible.next(!this.isModalVisible.value);
  }


  public getIsModalVisible(): Observable<boolean> {
    return this.isModalVisible;
  }
}
