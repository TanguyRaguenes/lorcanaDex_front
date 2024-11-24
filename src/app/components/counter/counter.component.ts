import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';
import { Subscription } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit, OnDestroy {


  private subscription: Subscription = new Subscription();

  protected nbPlayers: number = 0;
  // protected playersLore: Array<number>= [0, 0, 0, 0];
  protected player1Lore: number = 0;
  protected player2Lore: number = 0;
  protected player3Lore: number = 0;
  protected player4Lore: number = 0;
  protected gameHasWinner: boolean = false;
  private intervalIncreasePlayer1: any;
  private intervalDecreasePlayer1: any;
  private intervalIncreasePlayer2: any;
  private intervalDecreasePlayer2: any;
  private intervalIncreasePlayer3: any;
  private intervalDecreasePlayer3: any;
  private intervalIncreasePlayer4: any;
  private intervalDecreasePlayer4: any;


  public constructor(private counterService: CounterService, private router: Router) {
  }

  ngOnInit(): void {

    this.subscription.add(

      this.counterService.getNbPlayer().subscribe({
        next: (response: number) => {
          this.nbPlayers = response;
        }, error: (e => {
          console.log(e);
        })
      })

    )

    this.subscription.add(
      this.counterService.getPlayer1Lore().subscribe({
        next: (response: number) => {
          this.player1Lore = response;
          if (this.player1Lore >= 20) {
            this.gameHasWinner = true;
          }
        }, error: (e => {
          console.log(e);
        })
      })

    );

    this.subscription.add(
      this.counterService.getPlayer2Lore().subscribe({
        next: (response: number) => {
          this.player2Lore = response;
          if (this.player2Lore >= 20) {
            this.gameHasWinner = true;
          }
        }, error: (e => {
          console.log(e);
        })
      })

    )

    this.subscription.add(
      this.counterService.getPlayer3Lore().subscribe({
        next: (response: number) => {
          this.player3Lore = response;
          if (this.player3Lore >= 20) {
            this.gameHasWinner = true;
          }
        }, error: (e => {
          console.log(e);
        })
      })

    )

    this.subscription.add(
      this.counterService.getPlayer4Lore().subscribe({
        next: (response: number) => {
          this.player4Lore = response;
          if (this.player4Lore >= 20) {
            this.gameHasWinner = true;
          }
        }, error: (e => {
          console.log(e);
        })
      })

    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addAPlayer() {
    this.counterService.setNbPlayers(this.nbPlayers + 1)
  }

  public removeAPlayer() {
    this.counterService.setNbPlayers(this.nbPlayers - 1)
  }

  protected reset() {
    this.gameHasWinner = false;
    this.counterService.setPlayer1Lore(0)
    this.counterService.setPlayer2Lore(0)
    this.counterService.setPlayer3Lore(0)
    this.counterService.setPlayer4Lore(0)
    this.router.navigate(['/temporary']).then(() => {
      this.router.navigate(['/counter']);
    });
  }


  // PLAYER 1

  public increasePlayer1Lore() {
    this.counterService.setPlayer1Lore(this.player1Lore + 1)
  }

  startIncreasePlayer1Lore(): void {

    this.increasePlayer1Lore();
    this.intervalIncreasePlayer1 = setInterval(() => this.increasePlayer1Lore(), 150);
  }

  stopIncreasePlayer1Lore(): void {
    clearInterval(this.intervalIncreasePlayer1);
  }

  public decreasePlayer1Lore() {
    this.counterService.setPlayer1Lore(this.player1Lore - 1)
  }

  startDecreasePlayer1Lore(): void {
    this.decreasePlayer1Lore();
    this.intervalDecreasePlayer1 = setInterval(() => this.decreasePlayer1Lore(), 150);
  }

  stopDecreasePlayer1Lore(): void {
    clearInterval(this.intervalDecreasePlayer1);
  }

  // PLAYER 2

  public increasePlayer2Lore() {
    this.counterService.setPlayer2Lore(this.player2Lore + 1)
  }

  startIncreasePlayer2Lore(): void {

    this.increasePlayer2Lore();
    this.intervalIncreasePlayer2 = setInterval(() => this.increasePlayer2Lore(), 150);
  }

  stopIncreasePlayer2Lore(): void {
    clearInterval(this.intervalIncreasePlayer2);
  }

  public decreasePlayer2Lore() {
    this.counterService.setPlayer2Lore(this.player2Lore - 1)
  }

  startDecreasePlayer2Lore(): void {
    this.decreasePlayer2Lore();
    this.intervalDecreasePlayer2 = setInterval(() => this.decreasePlayer2Lore(), 150);
  }

  stopDecreasePlayer2Lore(): void {
    clearInterval(this.intervalDecreasePlayer2);
  }

  // PLAYER 3

  public increasePlayer3Lore() {
    this.counterService.setPlayer3Lore(this.player3Lore + 1)
  }

  startIncreasePlayer3Lore(): void {

    this.increasePlayer3Lore();
    this.intervalIncreasePlayer3 = setInterval(() => this.increasePlayer3Lore(), 150);
  }

  stopIncreasePlayer3Lore(): void {
    clearInterval(this.intervalIncreasePlayer3);
  }

  public decreasePlayer3Lore() {
    this.counterService.setPlayer3Lore(this.player3Lore - 1)
  }

  startDecreasePlayer3Lore(): void {
    this.decreasePlayer3Lore();
    this.intervalDecreasePlayer3 = setInterval(() => this.decreasePlayer3Lore(), 150);
  }

  stopDecreasePlayer3Lore(): void {
    clearInterval(this.intervalDecreasePlayer3);
  }

  // PLAYER 4

  public increasePlayer4Lore() {
    this.counterService.setPlayer4Lore(this.player4Lore + 1)
  }

  startIncreasePlayer4Lore(): void {

    this.increasePlayer4Lore();
    this.intervalIncreasePlayer4 = setInterval(() => this.increasePlayer4Lore(), 150);
  }

  stopIncreasePlayer4Lore(): void {
    clearInterval(this.intervalIncreasePlayer4);
  }

  public decreasePlayer4Lore() {
    this.counterService.setPlayer4Lore(this.player4Lore - 1)
  }

  startDecreasePlayer4Lore(): void {
    this.decreasePlayer4Lore();
    this.intervalDecreasePlayer4 = setInterval(() => this.decreasePlayer4Lore(), 150);
  }

  stopDecreasePlayer4Lore(): void {
    clearInterval(this.intervalDecreasePlayer4);
  }


  // public increasePlayerLore(playerId: number) {
  //   this.counterService.setPlayersLore(playerId, this.playersLore[playerId] + 1)
  // }

  // startIncrease(index: number): void {

  //   this.increasePlayerLore(index);
  //   this.interval = setInterval(() => this.increasePlayerLore(index), 150);
  // }

  // stopIncrease(): void {
  //   clearInterval(this.interval);
  // }

  // public decreasePlayerLore(playerId: number) {
  //   this.counterService.setPlayersLore(playerId, this.playersLore[playerId] - 1)
  // }

  // startDecrease(index: number): void {
  //   this.decreasePlayerLore(index);
  //   this.interval = setInterval(() => this.decreasePlayerLore(index), 150);
  // }

  // stopDecrease(): void {
  //   clearInterval(this.interval);
  // }

  // public getNbPlayersArray(): Array<number> {

  //   const nbPlayersArray = [];
  //   for (let i = 0; i < this.nbPlayers; i++) {
  //     nbPlayersArray[i] = 0;
  //   }
  //   return nbPlayersArray;
  // }

  // protected reset() {
  //   this.gameHasWinner = false;
  //   for (let i = 0; i <= 3; i++) {
  //     this.counterService.setPlayersLore(i, 0);
  //   }
  //   this.router.navigate(['/temporary']).then(() => {
  //     this.router.navigate(['/counter']);
  //   });
  // }

}
