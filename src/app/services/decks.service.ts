import { Injectable, OnInit } from '@angular/core';
import { Deck } from '../models/Deck';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Card } from '../models/Card';
import { FlashMessageService } from './flash-message.service';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  // ATTRIBUTS

  private userDecks: BehaviorSubject<Array<Deck>> = new BehaviorSubject<Array<Deck>>([]);

  private flashMessageService: FlashMessageService;
  private http: HttpClient;


  // CONSTRUCTEUR
  constructor(http: HttpClient, flashMessageService: FlashMessageService) {

    this.http = http;
    this.flashMessageService = flashMessageService;

  }

  //ALLER CHERCHER LES DECKS DU USER EN BDD

  public updateUserDecks(): void {

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>(`${environment.serverSide_decksApiRest}`, { headers }).pipe(
      map(response => response.map(e => new Deck(
        e.deckId,
        e.deckName,
        e.username,
        new Date(e.creationDate),
        e.updateDate ? new Date(e.updateDate) : null,
        e.firstInk,
        e.secondInk
      )))
    ).subscribe({
      next: (decks) => {
        console.log("UPDATE", decks)
        this.userDecks.next(decks)
      },
      error: (err) => {
        console.error('Error updateUserDecks  :', err);
        this.flashMessageService.setMessageType('error');
        this.flashMessageService.setMessageText('Error updateUserDecks');
      }
    });
  }


  // RECUPERER L'ATTRIBUT USERDECKS

  public getUserDecks(): Observable<Array<Deck>> {

    return this.userDecks.asObservable();

  }

  //AJOUT DU DECK EN BDD

  public addUserDeck(deck: Deck): Observable<any> {

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

  //SUPPRESSION DU DECK EN BDD

  public removeUserDeck(deckId: number | null): Observable<JSON> {

    console.log("removeUserDeck : " + deckId)

    const url: string = `${environment.serverSide_decksApiRest}?deckId=${deckId}`;

    console.log(url)
    const token: string | null = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const response = this.http.delete<JSON>(url, { headers });
    return response;

  }

}
