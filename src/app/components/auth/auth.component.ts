import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface LoginResponse {
  jwt: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor(private authService: AuthService, private router: Router) {

  }

  public username: string = "";
  public password: string = "";



  public submit(): void {

    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log(response);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('username', response.username);
        this.router.navigate(['/home']);
      }, error: (e => {
        console.log(e);
      })
    });



  }

  // onSubmitLogin(): void {



  //   this.http.post<LoginResponse>(environment.login, {
  //     username: this.username,
  //     password: this.password,
  //   }).subscribe({
  //     next: (response) => {

  //       console.log('Login successful', response);
  //       sessionStorage.setItem('jwtToken', response.jwt);
  //       this.router.navigate(['/home']);
  //     },
  //     error: (err) => {

  //       console.error('Login failed', err);

  //     }
  //   });
  // };

}
