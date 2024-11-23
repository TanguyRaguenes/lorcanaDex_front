import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {

  private messageType = new BehaviorSubject<string>('');
  private messageText = new BehaviorSubject<string>('');
  private isVisible = new BehaviorSubject<boolean>(false);

  constructor() {

  }

  public setMessageType(messageType: string) {
    this.messageType.next(messageType)
  }

  public getMessageType(): Observable<string> {
    return this.messageType.asObservable();
  }

  public setMessageText(messageText: string, triggerTimer: boolean) {
    this.messageText.next(messageText);
    this.isVisible.next(true);

    if (triggerTimer) {
      this.startTimer();
    }

  }

  public getMessageText(): Observable<string> {
    return this.messageText.asObservable();
  }

  public getIsVisible(): Observable<boolean> {
    return this.isVisible.asObservable();
  }

  protected startTimer() {

    setTimeout(() => {

      this.isVisible.next(false);

    }, 2000)
  }
}
