import { Component } from '@angular/core';
import { FlashMessageService } from '../../services/flash-message.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  // ATTRIBUTS

  private registrationService: RegistrationService;
  private flashMessageService: FlashMessageService;
  private router: Router;

  protected showPassword: boolean;

  protected illumineerName: string;
  protected username: string;
  protected password: string;
  protected confirmPassword: string;
  protected showConfirmPassword: boolean;


  // CONSTRUCTEUR

  constructor(registrationService: RegistrationService, router: Router, flashMessageService: FlashMessageService) {
    this.flashMessageService = flashMessageService,
      this.registrationService = registrationService,
      this.router = router,
      this.illumineerName = "",
      this.username = "",
      this.password = "",
      this.confirmPassword = "",
      this.showPassword = false,
      this.showConfirmPassword = false
  }

  // METHODES

  public submit(): void {

    // Check illumineerName 
    let regex = new RegExp("^[a-zA-Z0-9_]{3,20}$");

    if (!regex.test(this.illumineerName)) {

      this.flashMessageService.setMessageType("information");
      this.flashMessageService.setMessageText("Illumineer's name must be 3-20 characters: letters, numbers, underscores, no spaces or special characters.", true)
      return
    }

    // Check email
    regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

    if (!regex.test(this.username)) {

      this.flashMessageService.setMessageType("information");
      this.flashMessageService.setMessageText("Enter a valid email with letters, numbers, periods, and a domain.", true)
      return
    }


    // Check password

    regex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

    console.log(this.password)

    if (!regex.test(this.password)) {

      this.flashMessageService.setMessageType("information");
      this.flashMessageService.setMessageText("Password must be at least 8 characters, with one lowercase, one uppercase, one number, and one special character.", true)
      return
    }

    if (this.password != this.confirmPassword) {
      this.flashMessageService.setMessageType("information");
      this.flashMessageService.setMessageText("Passwords must match.", true)
      return
    }

    console.log({
      IllumineerName: this.illumineerName,
      email: this.username,
      password: this.password
    })

    this.registrationService.saveUserInBdd(this.illumineerName, this.username, this.password).subscribe({
      next: (response: Map<String, string>) => {
        console.log(response);

        if (response.has("success")) {
          this.flashMessageService.setMessageType("success");
          this.flashMessageService.setMessageText(response.get("success")!, true);
          this.router.navigate(['']);
        } else {
          this.flashMessageService.setMessageType("error");
          this.flashMessageService.setMessageText(response.get("error")!, true);
        }

      }, error: (e => {
        console.log(e);
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
    }, 1000)
  }

  public toggleShowConfirmPassword() {

    if (this.showConfirmPassword) {
      return;
    }

    this.showConfirmPassword = !this.showConfirmPassword;

    setTimeout(() => {
      this.showConfirmPassword = !this.showConfirmPassword;
    }, 2000)
  }

}
