import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Card } from '../models/Card';
import { Filter } from '../models/Filter';
import { CardApiLorcast } from '../models/CardApiLorcast';
import { SetApiLorcast } from '../models/SetApiLorcast';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  //ATTRIBUTS

  protected cardsAll: Array<CardApiLorcast> = [];

  private cardsToDisplay: BehaviorSubject<Array<CardApiLorcast>> = new BehaviorSubject<Array<CardApiLorcast>>([]);
  private sets: BehaviorSubject<Array<SetApiLorcast>> = new BehaviorSubject<Array<SetApiLorcast>>([]);

  private colors: Array<string> = [];
  private rarities: Array<string> = [];

  //CONSTRUCTEUR

  constructor(private http: HttpClient) {

    this.resetColors();
    this.resetRarities();





    this.getCards().subscribe({
      next: (response: Array<CardApiLorcast>) => {

        this.cardsAll = [...response];
        this.cardsToDisplay.next(this.cardsAll);

        console.log({
          response: response
        })
      }, error: (e => {

        throw new Error(`getCards : ${e}`)
      })
    })

    this.getSets().subscribe({
      next: (response: Array<SetApiLorcast>) => {
        this.sets.next(response)
        console.log({
          sets: this.sets
        })
      }, error: (e => {
        throw new Error(`getSets : ${e}`)
      })
    })





  }

  // GETTERS

  public getColors(): Array<string> {
    return this.colors;
  }

  public getRarities(): Array<string> {
    return this.rarities;
  }

  public getCardsAll(): Array<CardApiLorcast> {
    return this.cardsAll;
  }

  public getCardsToDisplay(): Observable<Array<CardApiLorcast>> {
    return this.cardsToDisplay;
  }

  // SETTERS

  public setColors(colors: Array<string | undefined>): void {

    this.colors = colors.filter(c => c !== undefined);

  }

  public resetColors(): void {

    this.colors = ["Amber", "Amethyst", "Emerald", "Ruby", "Sapphire", "Steel"];

  }

  public resetRarities(): void {

    this.rarities = ["Common", "Uncommon", "Rare", "Super Rare", "Legendary"];

  }

  public resetCardsToDisplay(): void {
    this.cardsToDisplay.next(this.cardsAll);
  }

  //METHODES

  //Récupérer toutes les cartes de la BDD

  public fetchcardsAll(): Observable<Array<Card>> {

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    console.log("getcardsAll Authorization :", {
      Authorization: `Bearer ${token}`
    });

    const response = this.http.get<Array<any>>(`${environment.apiGetCardsFromBDD}`, { headers }).pipe(
      map(response => response.map(e => new Card(
        e.cardId,
        e.artist,
        e.lorcanaSetName,
        e.classifications,
        e.dateAdded,
        e.setNum,
        e.color,
        e.gamemode,
        e.franchise,
        e.image,
        e.imageSmall,
        e.cost,
        e.inkable,
        e.name,
        e.type,
        e.lore,
        e.rarity,
        e.flavorText,
        e.uniqueId,
        e.cardNum,
        e.bodyText,
        e.willpower,
        e.cardVariants,
        e.dateModified,
        e.strength,
        e.setId

      ))));

    return response;
  }

  public getCards(): Observable<Array<CardApiLorcast>> {

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    console.log("getcardsAll Authorization :", {
      Authorization: `Bearer ${token}`
    });

    const response = this.http.get<Array<any>>(`${environment.serverside_cardsApiRest}/getCards`, { headers }).pipe(
      map(response => response.map(data => new CardApiLorcast(data))));

    return response;
  }

  public getSets(): Observable<Array<SetApiLorcast>> {

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    console.log("getcardsAll Authorization :", {
      Authorization: `Bearer ${token}`
    });

    const response = this.http.get<Array<any>>(`${environment.serverside_cardsApiRest}/getSets`, { headers }).pipe(
      map(response => response.map(data => new SetApiLorcast(data.setIdBdd, data.setIdApi, data.name, data.code, data.releasedAt, data.prereleasedAt))));

    return response;


  }


  //Bulk l'api et stocker dans la BDD

  public bulkData(): Observable<any> {

    console.log("bulk data")

    const token = sessionStorage.getItem('token');

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    console.log("bulkData Authorization :", {
      headers: headers.headers.Authorization
    });

    const response = this.http.get(`${environment.apiBulkCards}`, headers);
    return response;
  }

  public filterCards(filters: Array<Filter>) {

    let filteredCards: Array<CardApiLorcast> = [];
    !filters.some(e => e.getPriority() === 1) ? filteredCards = [...this.cardsAll] : null;

    filters.forEach(filter => {

      console.log(filter);

      switch (filter.getKey()) {

        case "color":
          filteredCards = [...filteredCards, ...this.cardsAll.filter(e => e.getInk() === filter.getValue())]

          break;
        case "rarity":
          filteredCards = filteredCards.filter(e => e.getRarity() === filter.getValue())
          break;
        case "name":
          filteredCards = filteredCards.filter(e => this.normalizeString(e.getName()).includes(this.normalizeString(filter.getValue())))
          break;
        case "set":
          filteredCards = filteredCards.filter(e => this.normalizeString(e.getSet().getName()).includes(this.normalizeString(filter.getValue())))
          break;

        default:
          break;
      }

      console.log(filteredCards);

    })

    this.cardsToDisplay.next(filteredCards);


  }

  // Fonction pour normaliser les chaînes
  public normalizeString(str: string): string {
    return str
      .normalize('NFD') // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents)
      .toUpperCase(); // Met tout en majuscule pour ignorer la casse
  }



}
