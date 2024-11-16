import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { FlashMessageService } from './flash-message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // ATTRIBUTS

  private renewTokenTimer: any;
  private flashMessageService: FlashMessageService;
  private http: HttpClient;
  private router: Router

  // CONSTRUCTEUR

  constructor(http: HttpClient, router: Router, flashMessageService: FlashMessageService) {
    this.flashMessageService = flashMessageService;
    this.http = http;
    this.router = router;
  }

  // METHODES


  // AUTHENTIFICATION

  public login(username: string, password: string): Observable<any> {

    const body = {
      "username": username,
      "password": password
    }

    const response = this.http.post<any>(environment.serveSide_authApiRest + "/authentificate", body)

    return response;

  }


  // LANCER TIMER POUR RENOUVELER TOKEN

  public triggerRenewTokenTimer(): void {
    console.log("triggerRenewTokenTimer")
    this.renewTokenTimer = setTimeout(
      () => {
        this.renewToken();
      }
      , 1000 * 60 * 25)
  }

  // RENOUVELER LE TOKEN

  public renewToken(): void {


    const token: string | null = sessionStorage.getItem("token");
    const username: string | null = sessionStorage.getItem("username");

    if (!token || !username) {
      console.warn("Token and/or username missing. Renewal cannot be performed.");
      return;
    }

    const url: string = environment.serveSide_authApiRest + "/renewToken";

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    const body = {
      username: username
    }


    this.http.post<any>(url, body, { headers }).subscribe({
      next: (response: any) => {
        console.log('Token renewed successfully.');
        console.log(response);
        sessionStorage.setItem('token', response.token);
        this.triggerRenewTokenTimer();

      }, error: (e => {
        console.error("Error when renewing token : ", e);
        this.flashMessageService.setMessageType("error")
        this.flashMessageService.setMessageText("Error when renewing token.")
        this.logout();

      })
    })

  }

  // ANNULER TIMER POUR RENOUVELER TOKEN

  public clearRenewTokenTimer() {
    if (this.renewTokenTimer) {
      clearTimeout(this.renewTokenTimer);
    }

  }

  // DECONNECTER UTILISATEUR

  public logout(): void {

    console.log("logout")

    this.clearRenewTokenTimer();

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');

    this.router.navigate(['/'])

    this.flashMessageService.setMessageType("success")
    this.flashMessageService.setMessageText("Logout successful.")
  }
}
