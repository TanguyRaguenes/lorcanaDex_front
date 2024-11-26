import { Injectable } from '@angular/core';
import { Card } from '../models/Card';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Deck } from '../models/Deck';
import { CardApiLorcast } from '../models/CardApiLorcast';
import { CardsService } from './cardsService';

@Injectable({
  providedIn: 'root'
})
export class DeckService {


  private deck: BehaviorSubject<Deck> = new BehaviorSubject<Deck>(new Deck(null, '', '', new Date(), null, '', ''));
  private deckCards: BehaviorSubject<Array<CardApiLorcast>> = new BehaviorSubject<Array<CardApiLorcast>>([]);

  constructor(private http: HttpClient, private cardsService: CardsService) {

  }

  public setDeck(deck: Deck): void {
    this.deck.next(deck)
    this.getDeckCardsInBdd(deck.getDeckId()!).subscribe({
      next: (response: Array<CardApiLorcast>) => {
        this.deckCards.next(response);
      }, error: (e => {
        console.log("getDeckCards error : " + e)
      })

    })

  }

  public getDeck(): Observable<Deck> {
    return this.deck;
  }

  public getDeckCards(): Observable<Array<CardApiLorcast>> {
    return this.deckCards;
  }

  //SAUVEGARDE DES CARTES DU DECK DANS LA BDD

  public saveDeckCardsInBdd(deckId: number, cardsAndQuantity: Map<number, number>): Observable<any> {

    console.log({
      Methode: "saveDeckCardsInBdd",
      id: deckId,
      cardsAndQuantity: cardsAndQuantity
    });

    const url: string = `${environment.serverSide_deckApiRest}/${deckId}`;

    console.log(url);

    const token: string | null = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    console.log(cardsAndQuantity);

    const cardsAndQuantityObject = Object.fromEntries(cardsAndQuantity);

    const response = this.http.post(url, cardsAndQuantityObject, { headers });

    return response;

  }


  public getDeckCardsInBdd(deckId: number): Observable<Array<CardApiLorcast>> {

    console.log({
      Methode: "getDeckCards",
      id: deckId
    });

    const url: string = `${environment.serverSide_deckApiRest}/${deckId}`;

    console.log(url);

    const token: string | null = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });



    return this.http.get<{ [key: number]: number }>(url, { headers }).pipe(

      map(response => {

        const tempArray: Array<CardApiLorcast> = [];
        for (const key in response) {
          const tempCard: CardApiLorcast = this.cardsService.getCardById(parseInt(key));
          if (tempCard) {
            tempArray.push(tempCard)
          }
        }

        return tempArray;
      })
    )

  }



  // public getDeckCards(deckId: number): Observable<any> {

  //   console.log({
  //     Methode: "getDeckCards",
  //     id: deckId
  //   });

  //   const url: string = `${environment.serverSide_deckApiRest}/${deckId}`;

  //   console.log(url);

  //   const token: string | null = sessionStorage.getItem("token");
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });

  //   const response = this.http.get<{ [key: number]: number }>(url, { headers }).pipe(
  //     tap(response => console.log('API response:', response)),
  //     map(response => {
  //       const map: Map<number, number> = new Map();
  //       for (const key in response) {
  //         map.set(Number(key), response[key])
  //       }

  //       return map;
  //     })
  //   );

  //   return response;

  // }


}
