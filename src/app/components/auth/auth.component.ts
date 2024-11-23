import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessageService } from '../../services/flash-message.service';
import { Subscription } from 'rxjs';


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

    this.authService.login(this.username, this.password);

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
