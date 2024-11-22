import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService implements OnInit {

  protected nbPlayers: BehaviorSubject<number> = new BehaviorSubject<number>(2);
  protected playersLore: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>([0, 0, 0, 0]);


  constructor() {

  }
  ngOnInit(): void {
    this.setNbPlayers(2);
  }

  public setNbPlayers(nbPlayers: number): void {

    nbPlayers > 4 ? nbPlayers = 4 : null;
    nbPlayers < 1 ? nbPlayers = 1 : null;
    this.nbPlayers.next(nbPlayers);
  }

  public getNbPlayer(): BehaviorSubject<number> {
    return this.nbPlayers;
  }

  public setPlayersLore(playerId: number, lore: number): void {
    lore > 20 ? lore = 20 : null;
    lore < 0 ? lore = 0 : null;
    const currentLore = this.playersLore.value;
    console.log({
      currentLore: currentLore
    })
    currentLore[playerId] = lore;
    this.playersLore.next([...currentLore]);
  }

  public getPlayersLore(): BehaviorSubject<Array<number>> {
    return this.playersLore
  }




}
