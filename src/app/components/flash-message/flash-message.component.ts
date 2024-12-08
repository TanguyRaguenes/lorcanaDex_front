import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FlashMessageService } from '../../services/flash-message.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flash-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flash-message.component.html',
  styleUrl: './flash-message.component.scss'
})
export class FlashMessageComponent implements OnInit, OnDestroy {


  protected flashMessageService: FlashMessageService;

  protected isVisible: boolean;
  protected messageType: String;
  protected messageText: String;

  private subscription: Subscription = new Subscription();

  constructor(flashMessageService: FlashMessageService) {

    this.flashMessageService = flashMessageService;

    this.isVisible = false;
    this.messageType = "";
    this.messageText = "";



  }
  ngOnInit(): void {

    this.subscription.add(
      this.flashMessageService.getMessageType().subscribe({
        next: (response => {
          this.messageType = response;
        }), error: (e => {
          console.log(e)
        })
      })

    )

    this.subscription.add(
      this.flashMessageService.getMessageText().subscribe({
        next: (response => {
          this.messageText = response;
        }), error: (e => {
          console.log(e)
        })
      })
    )

    this.subscription.add(
      this.flashMessageService.getIsVisible().subscribe({
        next: (response => {
          this.isVisible = response;
        }), error: (e => {
          console.log(e)
        })
      })

    )
  }

  // public setMessageType(messageType: String) {
  //   this.messageType = messageType;
  // }

  // public setMessageText(messageText: String) {
  //   this.messageText = messageText;
  // }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // public hide() {
  //   this.isVisible = false;
  // }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    // Vérifie si le clic est à l'intérieur de la navbar ou du menu
    if (!targetElement.closest('header') && this.isVisible) {
      this.isVisible = false; // Ferme le menu
    }
  }

}
