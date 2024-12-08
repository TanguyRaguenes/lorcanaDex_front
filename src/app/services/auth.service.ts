import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { FlashMessageService } from './flash-message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // ATTRIBUTS

  private timerToken: any;
  private timerInactivityWarning: any;
  private timerInactivityLogout: any;

  private flashMessageService: FlashMessageService;
  private http: HttpClient;
  private router: Router

  // CONSTRUCTEUR

  constructor(http: HttpClient, router: Router, flashMessageService: FlashMessageService) {
    this.flashMessageService = flashMessageService;
    this.http = http;
    this.router = router;
    this.startTracking();

  }

  // METHODES


  // GESTION INACTIVITE

  private startTracking() {
    ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'].forEach(event => {
      window.addEventListener(event, () => this.resetTimerInactivity());
    });
  }

  private startTimerInactivity() {

    this.timerInactivityWarning = setTimeout(() => {
      this.flashMessageService.setMessageType("information")
      this.flashMessageService.setMessageText(`${new Date().toLocaleString()} : You’ll be logged out in 3 minutes if inactive. Stay active to remain logged in.`, false)
    }, 1000 * 60 * 7)

    this.timerInactivityLogout = setTimeout(() => {
      // console.log("Utilisateur inactif")
      this.logout();
    }, 1000 * 60 * 10)
  }

  private resetTimerInactivity() {
    // console.log("reset timer inactivity")
    clearTimeout(this.timerInactivityWarning);
    clearTimeout(this.timerInactivityLogout);
    this.startTimerInactivity()
  }

  // AUTHENTIFICATION

  public login(username: string, password: string): void {

    const body = {
      "username": username,
      "password": password
    }

    // console.log({
    //   username: username,
    //   password: password
    // })

    this.http.post<{ token: string; username: string }>(environment.serveSide_authApiRest + "/authentificate", body).subscribe({
      next: (response: { token: string; username: string }) => {

        // console.log({
        //   token: response.token,
        //   username: response.username
        // })

        if (response.token != null && response.username != null) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('username', response.username);
          this.startTimerToken();
          this.router.navigate(['/home']);
          this.flashMessageService.setMessageType("success")
          this.flashMessageService.setMessageText("Connection successful !", true)
        } else {
          this.flashMessageService.setMessageType("error")
          this.flashMessageService.setMessageText("The email and password combination is invalid.", true)
        }

      }, error: (e => {
        console.log("login error : " + e);
        this.flashMessageService.setMessageType("error")
        this.flashMessageService.setMessageText("The email and password combination is invalid.", true)
      })
    })

  }


  // LANCER TIMER POUR RENOUVELER TOKEN

  public startTimerToken(): void {

    console.log("Start timer token")

    this.timerToken = setTimeout(
      () => {

        console.log("End timer token")

        this.renewToken();
        this.logout();


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


    this.http.post<{ token: string }>(url, body, { headers }).subscribe({
      next: (response: { token: string }) => {

        console.log({
          'Token renewed successfully': response
        });

        sessionStorage.setItem('token', response.token);

        this.startTimerToken();

      }, error: (e => {
        console.error("Error when renewing token : ", e);
        // this.flashMessageService.setMessageType("error")
        // this.flashMessageService.setMessageText("Error when renewing token.")
        this.logout();

      })
    })

  }

  // ANNULER TIMER POUR RENOUVELER TOKEN

  public clearTimerToken() {
    if (this.timerToken) {
      clearTimeout(this.timerToken);
    }

  }

  // DECONNECTER UTILISATEUR

  public logout(): void {

    console.log("logout")

    clearTimeout(this.timerToken);
    clearTimeout(this.timerInactivityWarning);
    clearTimeout(this.timerInactivityLogout);

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');

    this.router.navigate(['/'])

    this.flashMessageService.setMessageType("success")
    this.flashMessageService.setMessageText("Logout successful !", true)
  }
}
