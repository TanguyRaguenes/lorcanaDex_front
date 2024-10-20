import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private renewTokenTimer: any;

  constructor(private http: HttpClient, private router: Router) { }


  // AUTHENTIFICATION

  public login(username: string, password: string): Observable<any> {

    const body = {
      "username": username,
      "password": password
    }

    const response = this.http.post<any>(environment.serveSide_authApiRest + "/authentificate", body)

    return response;

  }


  public triggerRenewTokenTimer(): void {
    console.log("triggerRenewTokenTimer")
    this.renewTokenTimer = setTimeout(
      () => {
        this.renewToken();
      }
      , 1000 * 60 * 1)
  }

  public renewToken(): void {


    const token: string | null = sessionStorage.getItem("token");
    const username: string | null = sessionStorage.getItem("username");

    if (!token || !username) {
      console.warn("Token et/ou username manquant. Le renouvellement ne peut pas être effectué.");
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
        console.log('Token renouvelé avec succès.');
        console.log(response);
        sessionStorage.setItem('token', response.token);
        this.triggerRenewTokenTimer();

      }, error: (e => {
        console.error("Erreur lors du renouvellement du token", e);
        alert("Votre session a expiré. Veuillez vous reconnecter.");
        this.router.navigate(['/']);

      })
    })

  }

  public clearRenewTokenTimer() {
    if (this.renewTokenTimer) {
      clearTimeout(this.renewTokenTimer);
    }

  }

  public logout(): void {
    console.log("logout")
    this.clearRenewTokenTimer();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.router.navigate(['/'])
  }
}
