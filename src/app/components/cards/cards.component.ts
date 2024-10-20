import { Component, Input, TemplateRef } from '@angular/core';

import { Card } from '../../models/Card';
import { Filter } from '../../models/Filter';
import { CardsService } from '../../services/cardsService';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  @Input() cardTemplate!: TemplateRef<any>;

  public cardsStorage: Array<Card> = [];
  public cardsFilteredOnColor: Array<Card> = [];
  public cardsFilteredOnOthers: Array<Card> = [];
  public cardsFiltered: Array<Card> = [];
  public filterOnCardsName: string = "";


  public cardsToDisplay: Array<Card> = [];
  public page: number = 1;
  public nbCardsPerPage: number = 9;
  public counter: number = 0;
  public imagesLoaded: boolean = false;

  public filtersArray: Array<Filter> = [];

  public inkImgNameArray: Array<string> = [
    "Amber.png", "Amethyst.png", "Emerald.png", "Ruby.png", "Sapphire.png", "Steel.png"
  ];

  public rarityImgNameArray: Array<string> = [
    "Common.png", "Uncommon.png", "Rare.png", "Super Rare.png", "Legendary.png"
  ];


  constructor(private readonly cardsService: CardsService) {
    this.getDataFromApiBack();
  }


  //Récupération à partir BDD de l'ensemble des cartes

  public getDataFromApiBack(): void {
    const data = this.cardsService.getDataFromApiBack().subscribe({
      next: (response: any) => {
        console.log("Réponse API back")
        console.log(response);
        this.cardsStorage = [];
        response.forEach((element: any) => {
          let card = new Card(
            element.Artist,
            element.Set_Name,
            element.Classifications,
            element.Date_Added,
            element.Set_Num,
            element.Color,
            element.Gamemode,
            element.Franchise,
            element.Image,
            element.ImageSmall,
            element.Cost,
            element.Inkable,
            element.Name,
            element.Type,
            element.Lore,
            element.Rarity,
            element.Flavor_Text,
            element.Unique_ID,
            element.Card_Num,
            element.Body_Text,
            element.Willpower,
            element.Card_Variants,
            element.Date_Modified,
            element.Strength,
            element.Set_ID
          );
          this.cardsStorage.push(card);
          this.cardsFiltered.push(card);
        });
        console.log({
          "cardsStorage": this.cardsStorage,
          "length": this.cardsStorage.length
        })

        this.displayCards();
      }
    })

  }



  public displayCards(): void {

    this.cardsToDisplay = [];
    this.cardsToDisplay = this.cardsFiltered;

    console.log({
      "cardsToDisplay": this.cardsToDisplay
    }

    )
  }

  public ToggleVisibilityFiltersModal(): void {

    const filtersModal = document.getElementById("filtersModal") as HTMLDivElement;

    if (filtersModal.classList.contains("hidden")) {
      filtersModal.classList.remove("hidden")
      filtersModal.classList.add("block")
    } else {
      filtersModal.classList.remove("block")
      filtersModal.classList.add("hidden")
    }

  }



  // Gestion de l'affichage des encres

  public toggleDisplay(element: HTMLImageElement): void {

    if (element.classList.contains("grayscale")) {
      element.classList.remove("grayscale");
      element.classList.add("grayscale-0");
      element.classList.add("scale-150");
    } else {
      element.classList.add("grayscale");
      element.classList.remove("grayscale-0")
      element.classList.remove("scale-150");
    }
  }

  public addNewFilter(key: string, value: string, eventTarget: EventTarget | null) {


    let objectToAdd: Filter;

    if (eventTarget instanceof HTMLImageElement) {

      this.toggleDisplay(eventTarget);
      objectToAdd = new Filter(key, value.slice(0, -4));

    } else {
      objectToAdd = new Filter(key, value);
    }




    const exists = this.filtersArray.some(e =>
      e.getKey() === objectToAdd.getKey() && e.getValue() === objectToAdd.getValue()
    );

    if (exists) {

      this.filtersArray = this.filtersArray.filter(e =>
        !(e.getKey() === objectToAdd.getKey() && e.getValue() === objectToAdd.getValue())
      );
    } else {
      this.filtersArray.push(objectToAdd);
    }
    console.log(this.filtersArray)
  }



  // Filtrer les cartes à afficher

  public filterArray(): void {

    console.log(`Filtre sur le nom de la carte ${this.filterOnCardsName}`)

    console.log(this.filtersArray)

    this.filtersArray = this.filtersArray.filter(e =>
      !(e.getKey() === "name")
    )

    console.log(this.filtersArray)

    if (this.filterOnCardsName != "") {
      this.addNewFilter("name", this.filterOnCardsName, null)
    }



    this.cardsFilteredOnColor = [];
    this.cardsFilteredOnOthers = [];
    this.cardsFiltered = [];

    let nofilterOncolor = true;
    let nofilterOnOthers = true;

    this.filtersArray.forEach(filter => {

      //Le nom du getter de la classe Card est généré grâce à la key de l'objet filtre

      const methodName: string = "get" + filter.getKey().charAt(0).toUpperCase() + filter.getKey().slice(1);

      if (filter.getKey() == "color") {

        nofilterOncolor = false;
        this.filterColor(methodName, filter)

      }

    });

    nofilterOncolor ? this.cardsFilteredOnColor = this.cardsStorage.slice() : null;

    this.filtersArray.forEach(filter => {

      //Le nom du getter de la classe Card est généré grâce à la key de l'objet filtre

      const methodName: string = "get" + filter.getKey().charAt(0).toUpperCase() + filter.getKey().slice(1);

      if (filter.getKey() != "color") {
        nofilterOnOthers = false;
        this.filterOthers(methodName, filter)

      }

    });

    nofilterOnOthers ? this.cardsFilteredOnOthers = this.cardsFilteredOnColor.slice() : null;



    this.cardsFiltered = this.cardsFilteredOnOthers.slice();

    console.log("-----------------------")
    console.log(this.cardsFiltered)
    console.log("-----------------------")


    this.displayCards();
    this.ToggleVisibilityFiltersModal();

  }


  public filterColor(methodName: any, filter: Filter): void {

    const cardsThatMatchFilter = this.cardsStorage.filter(card => {

      if (typeof card[methodName as keyof Card] === 'function') {
        return (card[methodName as keyof Card] as Function).call(card).includes(filter.getValue());
      } else {
        console.error(`La méthode ${methodName} n'existe pas sur card`);
        return false;
      }

    });

    cardsThatMatchFilter.forEach(card => {
      if (!this.cardsFilteredOnColor.includes(card)) {
        this.cardsFilteredOnColor.push(card);
      }
    });


  }

  // Fonction pour normaliser les chaînes
  public normalizeString(str: string): string {
    return str
      .normalize('NFD') // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents)
      .toUpperCase(); // Met tout en majuscule pour ignorer la casse
  }


  public filterOthers(methodName: any, filter: Filter): void {


    const cardsThatMatchFilter = this.cardsFilteredOnColor.filter(card => {

      if (typeof card[methodName as keyof Card] === 'function') {
        // return (card[methodName as keyof Card] as Function).call(card).includes(filter.getValue());
        return this.normalizeString((card[methodName as keyof Card] as Function).call(card).toString())
          .includes(this.normalizeString(filter.getValue()));
      } else {
        console.error(`La méthode ${methodName} n'existe pas sur card`);
        return false;
      }

    });

    cardsThatMatchFilter.forEach(card => {
      if (!this.cardsFilteredOnOthers.includes(card)) {
        this.cardsFilteredOnOthers.push(card);
      }
    });

  }

  // Stockage en BDD de l'ensemble des cartes de Lorcana-api.com

  public bulkData(): void {

    this.cardsService.bulkData().subscribe({
      next: (response: any) => {
        console.log(response);
      }, error: (e => {
        console.log(e)
      })
    });

  }

}


