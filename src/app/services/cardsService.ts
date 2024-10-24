import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Card } from '../models/Card';
import { Filter } from '../models/Filter';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  //ATTRIBUTS

  protected allcards: Array<Card>;
  protected filteredCards: Array<Card>;

  private colors: Array<string>;
  private rarities: Array<string>;


  private http: HttpClient;

  //CONSTRUCTEUR

  constructor(http: HttpClient) {

    this.allcards = [];
    this.filteredCards = [];

    this.http = http;

    this.colors = ["Amber", "Amethyst", "Emerald", "Ruby", "Sapphire", "Steel"];
    this.rarities = ["Common", "Uncommon", "Rare", "Super Rare", "Legendary"];


    this.fetchAllCards().subscribe({
      next: (response: Array<Card>) => {
        this.allcards = [...response];
        this.filteredCards = [...response];
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

  public getFilteredCards(): Array<Card> {
    return this.filteredCards;
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


  // AJOUTER DES FILTRES AU TABLEAU DE FILTRES


  // public addNewFilter(key: string, value: string, eventTarget: EventTarget | null) {


  //   let objectToAdd: Filter;

  //   if (eventTarget instanceof HTMLImageElement) {

  //     this.toggleDisplay(eventTarget);
  //     objectToAdd = new Filter(key, value.slice(0, -4));

  //   } else {
  //     objectToAdd = new Filter(key, value);
  //   }




  //   const exists = this.filtersArray.some(e =>
  //     e.getKey() === objectToAdd.getKey() && e.getValue() === objectToAdd.getValue()
  //   );

  //   if (exists) {

  //     this.filtersArray = this.filtersArray.filter(e =>
  //       !(e.getKey() === objectToAdd.getKey() && e.getValue() === objectToAdd.getValue())
  //     );
  //   } else {
  //     this.filtersArray.push(objectToAdd);
  //   }
  //   console.log(this.filtersArray)
  // }



  // // Filtrer les cartes à afficher

  // public filterArray(): void {

  //   console.log(`Filtre sur le nom de la carte ${this.filterOnCardsName}`)

  //   console.log(this.filtersArray)

  //   this.filtersArray = this.filtersArray.filter(e =>
  //     !(e.getKey() === "name")
  //   )

  //   console.log(this.filtersArray)

  //   if (this.filterOnCardsName != "") {
  //     this.addNewFilter("name", this.filterOnCardsName, null)
  //   }



  //   this.cardsFilteredOnColor = [];
  //   this.cardsFilteredOnOthers = [];
  //   this.cardsFiltered = [];

  //   let nofilterOncolor = true;
  //   let nofilterOnOthers = true;

  //   this.filtersArray.forEach(filter => {

  //     //Le nom du getter de la classe Card est généré grâce à la key de l'objet filtre

  //     const methodName: string = "get" + filter.getKey().charAt(0).toUpperCase() + filter.getKey().slice(1);

  //     if (filter.getKey() == "color") {

  //       nofilterOncolor = false;
  //       this.filterColor(methodName, filter)

  //     }

  //   });

  //   nofilterOncolor ? this.cardsFilteredOnColor = this.cardsStorage.slice() : null;

  //   this.filtersArray.forEach(filter => {

  //     //Le nom du getter de la classe Card est généré grâce à la key de l'objet filtre

  //     const methodName: string = "get" + filter.getKey().charAt(0).toUpperCase() + filter.getKey().slice(1);

  //     if (filter.getKey() != "color") {
  //       nofilterOnOthers = false;
  //       this.filterOthers(methodName, filter)

  //     }

  //   });

  //   nofilterOnOthers ? this.cardsFilteredOnOthers = this.cardsFilteredOnColor.slice() : null;



  //   this.cardsFiltered = this.cardsFilteredOnOthers.slice();

  //   console.log("-----------------------")
  //   console.log(this.cardsFiltered)
  //   console.log("-----------------------")


  //   this.displayCards();
  //   this.ToggleVisibilityFiltersModal();

  // }


  // public filterColor(methodName: any, filter: Filter): void {

  //   const cardsThatMatchFilter = this.cardsStorage.filter(card => {

  //     if (typeof card[methodName as keyof Card] === 'function') {
  //       return (card[methodName as keyof Card] as Function).call(card).includes(filter.getValue());
  //     } else {
  //       console.error(`La méthode ${methodName} n'existe pas sur card`);
  //       return false;
  //     }

  //   });

  //   cardsThatMatchFilter.forEach(card => {
  //     if (!this.cardsFilteredOnColor.includes(card)) {
  //       this.cardsFilteredOnColor.push(card);
  //     }
  //   });


  // }

  // Fonction pour normaliser les chaînes
  public normalizeString(str: string): string {
    return str
      .normalize('NFD') // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents)
      .toUpperCase(); // Met tout en majuscule pour ignorer la casse
  }


  // public filterOthers(methodName: any, filter: Filter): void {


  //   const cardsThatMatchFilter = this.cardsFilteredOnColor.filter(card => {

  //     if (typeof card[methodName as keyof Card] === 'function') {
  //       return this.normalizeString((card[methodName as keyof Card] as Function).call(card).toString())
  //         .includes(this.normalizeString(filter.getValue()));
  //     } else {
  //       console.error(`La méthode ${methodName} n'existe pas sur card`);
  //       return false;
  //     }

  //   });

  //   cardsThatMatchFilter.forEach(card => {
  //     if (!this.cardsFilteredOnOthers.includes(card)) {
  //       this.cardsFilteredOnOthers.push(card);
  //     }
  //   });

  // }

}
