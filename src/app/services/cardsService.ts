import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Card } from '../models/Card';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  public getCards(): any {

    const response = this.http.get(environment.apiGetCards);

    return response;

  }


  public getCardById(id: string | null): Observable<any> {

    console.log("");

    const response = this.http.get(environment.apiGetCard + id);

    return response;

  }

  //Récupérer toutes les cartes de la BDD

  public getAllCards(): Observable<Array<Card>> {

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    console.log("getAllCards Authorization :", {
      Authorization: `Bearer ${token}`
    });

    const response = this.http.get<Array<any>>(`${environment.apiGetCardsFromBDD}`, { headers }).pipe(
      map(response => response.map(e => new Card(

        e.Artist,
        e.Set_Name,
        e.Classifications,
        e.Date_Added,
        e.Set_Num,
        e.Color,
        e.Gamemode,
        e.Franchise,
        e.Image,
        e.ImageSmall,
        e.Cost,
        e.Inkable,
        e.Name,
        e.Type,
        e.Lore,
        e.Rarity,
        e.Flavor_Text,
        e.Unique_ID,
        e.Card_Num,
        e.Body_Text,
        e.Willpower,
        e.Card_Variants,
        e.Date_Modified,
        e.Strength,
        e.Set_ID

      ))));

    return response;
  }


  //Bulk l'api et stocker dans la BDD

  public bulkData(): Observable<any> {

    console.log("bulk data")

    const token = sessionStorage.getItem('token');

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    console.log("bulkData Authorization :", {
      headers: headers.headers.Authorization
    });

    const response = this.http.get(`${environment.apiBulkCards}`, headers);
    return response;
  }

}
