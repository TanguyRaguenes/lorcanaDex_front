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

    this.rarities = ["Common", "Uncommon", "Rare", "Super Rare", "Legendary", "Enchanted"];

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
    let tempCards: Array<CardApiLorcast> = [];

    filters.forEach(filter => {
      if (filter.getKey() === "color") {
        tempCards = this.cardsAll.filter(Card => Card.getInk() == filter.getValue());
        console.log({
          tempCards1: tempCards
        })
      }
    });

    filteredCards = [...tempCards];

    filters.forEach(filter => {
      if (filter.getKey() === "rarity") {
        tempCards = filteredCards.filter(Card => Card.getRarity() == filter.getValue());

      }
    });

    filteredCards = [...tempCards];

    filteredCards = filteredCards.filter(card => {
      return filters.every(filter => {

        let value: number;
        let operator: string;

        switch (filter.getKey()) {
          // case "color":
          //   return card.getInk() === filter.getValue();

          // case "rarity":
          //   return card.getRarity() === filter.getValue();

          case "set":
            return this.normalizeString(card.getSet().getName()).includes(this.normalizeString(filter.getValue()));

          case "type":
            return card.getType().some(type =>
              this.normalizeString(type).includes(this.normalizeString(filter.getValue()))
            );

          case "cost":
          case "strength":
          case "willpower":
          case "lore":

            value = parseInt(filter.getValue());
            operator = filter.getOperator();
            let cardValue: number;

            switch (filter.getKey()) {
              case "cost":
                cardValue = card.getCost() ?? 0;
                break;
              case "strength":
                cardValue = card.getStrength() ?? 0;
                break;
              case "willpower":
                cardValue = card.getWillpower() ?? 0;
                break;
              case "lore":
                cardValue = card.getLore() ?? 0;
                break;
              default:
                cardValue = 0;
            }

            switch (operator) {
              case "=": return cardValue === value;
              case ">": return cardValue > value;
              case "<": return cardValue < value;
              case ">=": return cardValue >= value;
              case "<=": return cardValue <= value;
              default: return true;
            }

          case "text":
            const cardText = card.getText();
            return cardText ? this.normalizeString(cardText).includes(this.normalizeString(filter.getValue())) : false;

          case "name":
            return this.normalizeString(card.getName()).includes(this.normalizeString(filter.getValue()));

          default:
            return true;
        }
      });
    });


    // let filteredCards: Array<CardApiLorcast> = [];

    // !filters.some(e => e.getPriority() === 1) ? filteredCards = [...this.cardsAll] : null;

    // filters.forEach(filter => {

    //   console.log(filter);

    //   let value: number = 0;
    //   let operator: string = "";

    //   switch (filter.getKey()) {

    //     case "color":
    //       filteredCards = [...filteredCards, ...this.cardsAll.filter(e => e.getInk() === filter.getValue())]
    //       break;

    //     case "rarity":
    //       filteredCards = filteredCards.filter(e => e.getRarity() === filter.getValue())
    //       break;

    //     case "set":
    //       filteredCards = filteredCards.filter(e => this.normalizeString(e.getSet().getName()).includes(this.normalizeString(filter.getValue())))
    //       break;

    //     case "type":
    //       filteredCards = filteredCards.filter(e =>
    //         e.getType().some(type =>
    //           this.normalizeString(type).includes(this.normalizeString(filter.getValue()))
    //         )
    //       );
    //       break;

    //     case "cost":
    //       value = parseInt(filter.getValue());
    //       operator = filter.getOperator();

    //       if (operator === "=") {
    //         filteredCards = filteredCards.filter(e => (e.getCost() ?? 0) == value);
    //       } else if (operator === ">") {
    //         filteredCards = filteredCards.filter(e => (e.getCost() ?? 0) > value);
    //       } else if (operator === "<") {
    //         filteredCards = filteredCards.filter(e => (e.getCost() ?? 0) < value);
    //       } else if (operator === ">=") {
    //         filteredCards = filteredCards.filter(e => (e.getCost() ?? 0) >= value);
    //       } else if (operator === "<=") {
    //         filteredCards = filteredCards.filter(e => (e.getCost() ?? 0) <= value);
    //       }
    //       break;
    //     case "strength":
    //       value = parseInt(filter.getValue());
    //       operator = filter.getOperator();

    //       if (operator === "=") {
    //         filteredCards = filteredCards.filter(e => (e.getStrength() ?? 0) == value);
    //       } else if (operator === ">") {
    //         filteredCards = filteredCards.filter(e => (e.getStrength() ?? 0) > value);
    //       } else if (operator === "<") {
    //         filteredCards = filteredCards.filter(e => (e.getStrength() ?? 0) < value);
    //       } else if (operator === ">=") {
    //         filteredCards = filteredCards.filter(e => (e.getStrength() ?? 0) >= value);
    //       } else if (operator === "<=") {
    //         filteredCards = filteredCards.filter(e => (e.getStrength() ?? 0) <= value);
    //       }
    //       break;
    //     case "willpower":
    //       value = parseInt(filter.getValue());
    //       operator = filter.getOperator();

    //       if (operator === "=") {
    //         filteredCards = filteredCards.filter(e => (e.getWillpower() ?? 0) == value);
    //       } else if (operator === ">") {
    //         filteredCards = filteredCards.filter(e => (e.getWillpower() ?? 0) > value);
    //       } else if (operator === "<") {
    //         filteredCards = filteredCards.filter(e => (e.getWillpower() ?? 0) < value);
    //       } else if (operator === ">=") {
    //         filteredCards = filteredCards.filter(e => (e.getWillpower() ?? 0) >= value);
    //       } else if (operator === "<=") {
    //         filteredCards = filteredCards.filter(e => (e.getWillpower() ?? 0) <= value);
    //       }
    //       break;
    //     case "lore":
    //       value = parseInt(filter.getValue());
    //       operator = filter.getOperator();

    //       if (operator === "=") {
    //         filteredCards = filteredCards.filter(e => (e.getLore() ?? 0) == value);
    //       } else if (operator === ">") {
    //         filteredCards = filteredCards.filter(e => (e.getLore() ?? 0) > value);
    //       } else if (operator === "<") {
    //         filteredCards = filteredCards.filter(e => (e.getLore() ?? 0) < value);
    //       } else if (operator === ">=") {
    //         filteredCards = filteredCards.filter(e => (e.getLore() ?? 0) >= value);
    //       } else if (operator === "<=") {
    //         filteredCards = filteredCards.filter(e => (e.getLore() ?? 0) <= value);
    //       }
    //       break;

    //     case "text":
    //       filteredCards = filteredCards.filter(e => {
    //         const cardText = e.getText();
    //         return cardText
    //           ? this.normalizeString(cardText).includes(this.normalizeString(filter.getValue()))
    //           : false;
    //       });
    //       break;



    //     case "name":
    //       filteredCards = filteredCards.filter(e => this.normalizeString(e.getName()).includes(this.normalizeString(filter.getValue())))
    //       break;


    //     default:
    //       break;
    //   }

    //   console.log(filteredCards);

    // })

    this.cardsToDisplay.next(filteredCards);


  }

  // Fonction pour normaliser les chaînes
  public normalizeString(str: string): string {
    return str
      .normalize('NFD') // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents)
      .toUpperCase(); // Met tout en majuscule pour ignorer la casse
  }


  public getCardById(cardId: number): CardApiLorcast {
    return this.cardsAll.filter(card => card.getCardIdBdd() == cardId)[0];
  }



}
