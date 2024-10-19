import { Injectable } from '@angular/core';
import { Deck } from '../models/Deck';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private http: HttpClient) { }


  //RECUPERER LES DECKS DE LA BDD

  public getDecksFromBdd(): Observable<Deck[]> {

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "username": username || '',
    });

    console.log("getDecksFromBdd Authorization :", {
      "headers": headers
    });

    const response = this.http.get<any[]>(`${environment.serverSide_decksApiRest}`, { headers }).pipe(
      map(response => response.map(e => new Deck(
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


  //AJOUTER DECK A LA BDD

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
}
