import { Injectable } from '@angular/core';
import { Deck } from '../models/Deck';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private http: HttpClient) { }


  public addDeckToBdd(deck: Deck): Observable<any> {

    console.log(deck.toString());

    const token = sessionStorage.getItem('jwtToken');

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
