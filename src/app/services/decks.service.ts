import { Injectable } from '@angular/core';
import { Deck } from '../models/Deck';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Card } from '../models/Card';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private http: HttpClient) { }

  //AJOUT DECK BDD

  public addDeckToBdd(deck: Deck): Observable<any> {

    console.log(deck.toString());

    const token = sessionStorage.getItem('token');

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    console.log("addDeckToBdd Authorization :", {
      headers: headers.headers.Authorization
    });

    const response = this.http.post(`${environment.serverSide_decksApiRest}`, deck, headers);
    return response;

  }

  //RECUPERATION DECKS BDD

  public getDecksFromBdd(): Observable<Deck[]> {

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      username: username || '',
    });

    console.log("getDecksFromBdd Authorization :", {
      "headers": headers
    });

    const response = this.http.get<any[]>(`${environment.serverSide_decksApiRest}`, { headers }).pipe(
      map(response => response.map(e => new Deck(
        e.deckId,
        e.deckName,
        e.username,
        new Date(e.creationDate),
        e.updateDate ? new Date(e.updateDate) : null,
        e.firstInk,
        e.secondInk
      )))


    );

    return response;

  }

  //SUPPRESSION DECK BDD

  public removeDeckFromBdd(deckId: number | null): Observable<JSON> {

    console.log("removeDeckFromBdd : " + deckId)

    const url: string = `${environment.serverSide_decksApiRest}?deckId=${deckId}`;

    console.log(url)
    const token: string | null = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    const response = this.http.delete<JSON>(url, { headers })

    return response;

  }

}
