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



  public saveDeckCardsInBdd(deckId: number, cards: Array<Card>): Observable<any> {

    console.log({
      Methode: "saveDeckCardsInBdd",
      id: deckId,
      cards: cards
    });

    const url: string = `${environment.serverSide_deckApiRest}/${deckId}`;

    console.log(url);

    const token: string | null = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    console.log(cards);

    const response = this.http.post(url, cards, { headers });

    return response;

  }
}
