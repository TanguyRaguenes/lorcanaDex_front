import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private http: HttpClient;


  constructor(http: HttpClient) {
    this.http = http
  }

  public saveUserInBdd(illumineerName: string, username: string, password: string): Observable<Map<String, string>> {

    const body = {
      illumineerName: illumineerName,
      email: username,
      password: password
    }

    const response = this.http.post<{ [key: string]: string }>(environment.serveSide_registrationApiRest, body).pipe(
      map(jsonResponse => {
        const map: Map<String, string> = new Map();
        for (const key in jsonResponse) {
          map.set(key, jsonResponse[key]);
        }
        return map;
      })
    )

    return response;

  }


}
