import { Component } from '@angular/core';
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
export class FlashMessageComponent {


  protected flashMessageService: FlashMessageService;

  protected isVisible: boolean;

  // success, error, information
  protected messageType: String;
  protected messageText: String;

  private subscription: Subscription = new Subscription();

  constructor(flashMessageService: FlashMessageService) {
    this.isVisible = false;
    this.messageType = "";
    this.messageText = "";
    this.flashMessageService = flashMessageService;

    this.subscription.add(
      flashMessageService.getMessageType().subscribe({
        next: (response => {
          this.messageType = response;
        }), error: (e => {
          console.log(e)
        })
      })

    )

    this.subscription.add(
      flashMessageService.getMessageText().subscribe({
        next: (response => {
          this.messageText = response;
        }), error: (e => {
          console.log(e)
        })
      })
    )

    this.subscription.add(
      flashMessageService.getIsVisible().subscribe({
        next: (response => {
          this.isVisible = response;
        }), error: (e => {
          console.log(e)
        })
      })

    )

  }

  public setMessageType(messageType: String) {
    this.messageType = messageType;
  }

  public setMessageText(messageText: String) {
    this.messageText = messageText;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
