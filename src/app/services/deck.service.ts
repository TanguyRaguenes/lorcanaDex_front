import { Injectable } from '@angular/core';
import { Card } from '../models/Card';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Deck } from '../models/Deck';
import { CardApiLorcast } from '../models/CardApiLorcast';
import { CardsService } from './cardsService';
import { DeckCard } from '../models/DeckCard';

@Injectable({
  providedIn: 'root'
})
export class DeckService {


  private deck: BehaviorSubject<Deck> = new BehaviorSubject<Deck>(new Deck(null, '', '', new Date(), null, '', ''));
  private deckCards: BehaviorSubject<Array<DeckCard>> = new BehaviorSubject<Array<DeckCard>>([]);

  private deckStats: BehaviorSubject<Map<string, number>> = new BehaviorSubject<Map<string, number>>(new Map());

  constructor(private http: HttpClient, private cardsService: CardsService) {

  }


  public calculateDeckStats(): void {

    console.log("calculateDeckStats");
    let deckPrice: number = 0;
    let nbCards: number = 0;
    let inkwell: number = 0;



    const stats: Map<string, number> = new Map<string, number>();
    const deckCardsValue = this.deckCards.value;


    if (deckCardsValue) {
      deckCardsValue.forEach(deckCard => {
        deckPrice += parseFloat(deckCard.getCard().getPrices().getUsd() ?? '0') * deckCard.getQuantity();
        // inkCounts[deckCard.getCard().getInk()] += deckCard.getQuantity();
        nbCards += deckCard.getQuantity();

        deckCard.getCard().getType().forEach(e => {
          stats.set(`type_${e}`, (stats.get(`type_${e}`) ?? 0) + deckCard.getQuantity())
        })

        deckCard.getCard().getClassifications().forEach(e => {
          stats.set(`clas_${e}`, (stats.get(`clas_${e}`) ?? 0) + deckCard.getQuantity())
        })

        deckCard.getCard().getKeywords().forEach(e => {
          stats.set(`keyw_${e}`, (stats.get(`keyw_${e}`) ?? 0) + deckCard.getQuantity())
        })


        stats.set(`rari_${deckCard.getCard().getRarity()}`, (stats.get(`rari_${deckCard.getCard().getRarity()}`) ?? 0) + deckCard.getQuantity())
        stats.set(`inks_${deckCard.getCard().getInk()}`, (stats.get(`inks_${deckCard.getCard().getInk()}`) ?? 0) + deckCard.getQuantity())
        if (deckCard.getCard().getInkwell() == true) {
          stats.set("inkwell", (stats.get("inkwell") ?? 0) + deckCard.getQuantity())
        }



      });

    }

    // inkwell = deckCardsValue.filter(deckCard => deckCard.getCard().getInkwell() == true).length
    // stats.set("inkwell", inkwell)

    stats.set("deckPrice", Math.round(deckPrice * 100) / 100)
    stats.set("nbCards", nbCards)

    this.deckStats.next(stats);

  }

  public getDeckStats(): Observable<Map<string, number>> {

    return this.deckStats;
  }

  public setDeck(deck: Deck): void {
    this.deck.next(deck)
    this.fetchDeckCards(deck.getDeckId()!).subscribe({
      next: (response: Array<DeckCard>) => {
        this.deckCards.next(response);
        this.calculateDeckStats();
      }, error: (e => {
        console.log("getDeckCards error : " + e)
      })

    })

  }

  public getDeck(): Observable<Deck> {
    return this.deck;
  }

  public getDeckCards(): Observable<Array<DeckCard>> {
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


  public fetchDeckCards(deckId: number): Observable<Array<DeckCard>> {

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

        const tempArray: Array<DeckCard> = [];
        for (const key in response) {
          const tempCard: CardApiLorcast = this.cardsService.getCardById(parseInt(key));
          const tempQuantity: number = response[key];
          if (tempCard) {
            tempArray.push(new DeckCard(tempCard, tempQuantity))
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
