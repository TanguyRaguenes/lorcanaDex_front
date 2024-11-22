import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';
import { Subscription } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit, OnDestroy {

  private counterService: CounterService;
  private subscription: Subscription = new Subscription;
  protected nbPlayers: number;
  protected playersLore: Array<number>;
  private interval: any;


  public constructor(counterService: CounterService) {
    this.counterService = counterService;
    this.nbPlayers = 0;
    this.playersLore = [0, 0, 0, 0];

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

      this.counterService.getPlayersLore().subscribe({
        next: (response: Array<number>) => {
          this.playersLore = response;
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

  public increasePlayerLore(playerId: number) {
    this.counterService.setPlayersLore(playerId, this.playersLore[playerId] + 1)
  }

  startIncrease(index: number): void {
    this.increasePlayerLore(index);
    this.interval = setInterval(() => this.increasePlayerLore(index), 100);
  }

  stopIncrease(): void {
    clearInterval(this.interval);
  }

  public decreasePlayerLore(playerId: number) {
    this.counterService.setPlayersLore(playerId, this.playersLore[playerId] - 1)
  }

  startDecrease(index: number): void {
    this.decreasePlayerLore(index);
    this.interval = setInterval(() => this.decreasePlayerLore(index), 100);
  }

  stopDecrease(): void {
    clearInterval(this.interval);
  }

  public getNbPlayersArray(): Array<number> {

    const nbPlayersArray = [];
    for (let i = 0; i < this.nbPlayers; i++) {
      nbPlayersArray[i] = 0;
    }
    return nbPlayersArray;
  }

}
