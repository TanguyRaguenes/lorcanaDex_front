import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  public getDataFromApiBack(): Observable<any> {

    const token = sessionStorage.getItem('jwtToken');
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };


    console.log("getDataFromApiBack Authorization :", {
      headers: headers.headers.Authorization
    });
    const response = this.http.get(`${environment.apiGetCardsFromBDD}`, headers)
    // const response = this.http.get(`${environment.apiGetCardsFromBDD}/rarity/Legendary`, headers)

    return response;
  }

  public bulkData(): Observable<any> {

    console.log("bulk data")

    const token = sessionStorage.getItem('jwtToken');
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    return this.http.get(`${environment.apiBulkCards}`, headers)

  }

}
