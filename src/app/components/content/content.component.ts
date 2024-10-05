import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [LoginFormComponent, HttpClient],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

  constructor(private readonly http: HttpClient) {

  }

  public onLogin(input: any): void {
    console.log("onLogin")
    console.log(input);



    this.http.post(environment.login, {
      username: input.username,
      password: input.password,
    }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Enregistrer le JWT dans sessionStorage
        // sessionStorage.setItem('jwtToken', response.jwt);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });

  }

}
