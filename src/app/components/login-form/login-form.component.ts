import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  jwt: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  constructor(private readonly http: HttpClient, private readonly router: Router) {

  }

  public username: string = "";
  public password: string = "";

  onSubmitLogin(): void {

    console.log("onSubmitLogin")
    console.log("username : " + this.username)
    console.log("password : " + this.password)

    this.http.post<LoginResponse>(environment.login, {
      username: this.username,
      password: this.password,
    }).subscribe({
      next: (response) => {

        console.log('Login successful', response);
        sessionStorage.setItem('jwtToken', response.jwt);
        this.router.navigate(['/home']);
      },
      error: (err) => {

        console.error('Login failed', err);

      }
    });
  };

}
