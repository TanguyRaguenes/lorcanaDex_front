import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


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

        this.authService.triggerRenewTokenTimer();

        this.router.navigate(['/home']);
      }, error: (e => {
        console.log(e);
      })
    });

  }

}
