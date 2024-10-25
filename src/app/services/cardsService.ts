import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Card } from '../models/Card';
import { Filter } from '../models/Filter';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  //ATTRIBUTS

  protected allcards: Array<Card>;
  private cardsToDisplay: BehaviorSubject<Array<Card>> = new BehaviorSubject<Array<Card>>([]);


  private colors: Array<string>;
  private rarities: Array<string>;


  private http: HttpClient;

  //CONSTRUCTEUR

  constructor(http: HttpClient) {

    this.allcards = [];


    this.http = http;

    this.colors = ["Amber", "Amethyst", "Emerald", "Ruby", "Sapphire", "Steel"];
    this.rarities = ["Common", "Uncommon", "Rare", "Super Rare", "Legendary"];


    this.fetchAllCards().subscribe({
      next: (response: Array<Card>) => {
        this.allcards = [...response];
        this.cardsToDisplay.next(this.allcards);
      }, error: (e => {
        throw new Error(`fetchAllCards : ${e}`)
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

  public getAllCards(): Array<Card> {
    return this.allcards;
  }

  public getCardsToDisplay(): Observable<Array<Card>> {
    return this.cardsToDisplay.asObservable();
  }

  //METHODES

  //Récupérer toutes les cartes de la BDD

  public fetchAllCards(): Observable<Array<Card>> {

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    console.log("getAllCards Authorization :", {
      Authorization: `Bearer ${token}`
    });

    const response = this.http.get<Array<any>>(`${environment.apiGetCardsFromBDD}`, { headers }).pipe(
      map(response => response.map(e => new Card(

        e.Artist,
        e.Set_Name,
        e.Classifications,
        e.Date_Added,
        e.Set_Num,
        e.Color,
        e.Gamemode,
        e.Franchise,
        e.Image,
        e.ImageSmall,
        e.Cost,
        e.Inkable,
        e.Name,
        e.Type,
        e.Lore,
        e.Rarity,
        e.Flavor_Text,
        e.Unique_ID,
        e.Card_Num,
        e.Body_Text,
        e.Willpower,
        e.Card_Variants,
        e.Date_Modified,
        e.Strength,
        e.Set_ID

      ))));

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

    let filteredCards: Array<Card> = [];
    !filters.some(e => e.getPriority() === 1) ? filteredCards = [...this.allcards] : null;

    filters.forEach(filter => {

      console.log(filter);

      switch (filter.getKey()) {

        case "color":
          filteredCards = [...filteredCards, ...this.allcards.filter(e => e.getColor() === filter.getValue())]

          break;
        case "rarity":
          filteredCards = filteredCards.filter(e => e.getRarity() === filter.getValue())
          break;
        case "name":
          filteredCards = filteredCards.filter(e => this.normalizeString(e.getName()).includes(this.normalizeString(filter.getValue())))
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
