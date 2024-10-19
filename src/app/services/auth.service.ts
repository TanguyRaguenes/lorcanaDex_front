import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {

    const body = {
      "username": username,
      "password": password
    }

    const response = this.http.post<JSON>(environment.serveSide_authApiRest, body)

    return response;

  }
}
