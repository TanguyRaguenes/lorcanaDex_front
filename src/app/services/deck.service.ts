import { Injectable } from '@angular/core';
import { Card } from '../models/Card';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeckService {


  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
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
}
