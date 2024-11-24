import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService implements OnInit {

  protected nbPlayers: BehaviorSubject<number> = new BehaviorSubject<number>(2);
  // protected playersLore: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>([0, 0, 0, 0]);
  protected player1Lore: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  protected player2Lore: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  protected player3Lore: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  protected player4Lore: BehaviorSubject<number> = new BehaviorSubject<number>(0);


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

  // public setPlayersLore(playerId: number, lore: number): void {
  //   lore > 20 ? lore = 20 : null;
  //   lore < 0 ? lore = 0 : null;
  //   const currentLore = this.playersLore.value;
  //   console.log({
  //     currentLore: currentLore
  //   })
  //   currentLore[playerId] = lore;
  //   this.playersLore.next([...currentLore]);
  // }

  // public getPlayersLore(): BehaviorSubject<Array<number>> {
  //   return this.playersLore
  // }

  public setPlayer1Lore(lore: number): void {
    lore > 20 ? lore = 20 : null;
    lore < 0 ? lore = 0 : null;
    this.player1Lore.next(lore);
  }

  public getPlayer1Lore(): BehaviorSubject<number> {
    return this.player1Lore
  }

  public setPlayer2Lore(lore: number): void {
    lore > 20 ? lore = 20 : null;
    lore < 0 ? lore = 0 : null;
    this.player2Lore.next(lore);
  }

  public getPlayer2Lore(): BehaviorSubject<number> {
    return this.player2Lore
  }

  public setPlayer3Lore(lore: number): void {
    lore > 20 ? lore = 20 : null;
    lore < 0 ? lore = 0 : null;
    this.player3Lore.next(lore);
  }

  public getPlayer3Lore(): BehaviorSubject<number> {
    return this.player3Lore
  }

  public setPlayer4Lore(lore: number): void {
    lore > 20 ? lore = 20 : null;
    lore < 0 ? lore = 0 : null;
    this.player4Lore.next(lore);
  }

  public getPlayer4Lore(): BehaviorSubject<number> {
    return this.player4Lore
  }




}
