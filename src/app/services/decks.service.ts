import { Injectable } from '@angular/core';
import { Deck } from '../models/Deck';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor() { }


  public addDeckToBdd(deck: Deck) {

    console.log("Création du deck !")

    console.log(deck.toString());


  }
}
