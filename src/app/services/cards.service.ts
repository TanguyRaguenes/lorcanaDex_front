import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http:HttpClient) { }

  public getCards():any{

    console.log("getCards")

    console.log(environment.apiGetCards)

    const response= this.http.get(environment.apiGetCards);

    console.log(response)

    return response;


    
  }


  public getCardById(id:string|null): Observable<any>{

    console.log("getCardById")

    console.log(environment.apiGetCard + id);

    const response= this.http.get(environment.apiGetCard + id);

    console.log(response)

    return response;



  }

}
