import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessageService } from '../../services/flash-message.service';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  // ATTRIBUTS

  private flashMessageService: FlashMessageService;
  private authService: AuthService;
  private router: Router;

  protected username: string;
  protected password: string;
  protected showPassword: boolean;

  // CONSTRUCTEUR

  constructor(authService: AuthService, router: Router, flashMessageService: FlashMessageService) {
    this.flashMessageService = flashMessageService,
      this.authService = authService,
      this.router = router,
      this.username = "",
      this.password = "",
      this.showPassword = false

  }

  // METHODES

  public submit(): void {

    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {

        console.log(response);
        if (response.token != null && response.username != null) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('username', response.username);

          this.authService.triggerRenewTokenTimer();

          this.router.navigate(['/home']);
          this.flashMessageService.setMessageType("success")
          this.flashMessageService.setMessageText("Connection successful.")
        } else {
          this.flashMessageService.setMessageType("error")
          this.flashMessageService.setMessageText("The email and password combination is invalid.")
        }


      }, error: (e => {
        console.warn("Error when connecting : ", e);
        this.flashMessageService.setMessageType("error")
        this.flashMessageService.setMessageText("Error when connecting.")
      })
    });

  }

  public toggleShowPassword() {

    if (this.showPassword) {
      return;
    }

    this.showPassword = !this.showPassword;

    setTimeout(() => {
      this.showPassword = !this.showPassword;
    }, 2000)
  }


}
