import { Component } from '@angular/core';

import { Card } from '../../models/Card';
import { CardsService } from '../../services/cards.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  public cardsStorage: Array<Card> = [];
  public cardsFiltered: Array<Card> = [];
  public cardsToDisplay: Array<Card> = [];
  public page: number = 1;
  public nbCardsPerPage: number = 9;
  public counter: number = 0;
  public imagesLoaded: boolean = false;

  public inkImgNameArray: Array<string> = [
    "Amber.png", "Amethyst.png", "Emerald.png", "Ruby.png", "Sapphire.png", "Steel.png"
  ];


  constructor(private readonly cardsService: CardsService) {
    // this.loadCards();
    this.getDataFromApiBack();
  }


  public loadCards(): void {


    this.cardsService.getCards().subscribe(
      {

        next: (response: any) => {
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
            // this.cardsStorage.push(card);
          });

          console.log("Réponse API externe")
          console.log(this.cardsStorage);


        }, error: (error: any) => {
          console.log('Some error happenned');
          console.error(error);
        }

      }

    )

  }


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
    this.imagesLoaded = false;
    console.log(`page: ${this.page}`)
    this.cardsToDisplay = [];
    const startIndex = (this.page - 1) * this.nbCardsPerPage;
    const endIndex = startIndex + this.nbCardsPerPage;
    this.cardsToDisplay = this.cardsFiltered.slice(startIndex, endIndex);
    console.log({
      "cardsToDisplay": this.cardsToDisplay
    }

    )
  }

  public nextPage(): void {
    console.log("nextPage")
    console.log(`page: ${this.page}`)
    console.log(`${this.cardsFiltered.length}`)
    if ((this.page * this.nbCardsPerPage) < this.cardsFiltered.length) {
      this.page++;
      console.log(`page: ${this.page}`)
      this.displayCards();
    }
  }

  public previousPage(): void {
    console.log("previousPage")
    console.log(`page: ${this.page}`)
    if (this.page > 1) {
      this.page--;
      console.log(`page: ${this.page}`)
      this.displayCards();
    }
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

  public filterArray(key: string, value: string): void {

    console.log(`filterArray key:${key}, value:${value}`)

    this.cardsFiltered = [];
    this.cardsFiltered = this.cardsStorage.filter(e => {
      return e.getColor() == value.slice(0, -4);
    })

    this.displayCards();

  }

  public onImageLoad() {
    this.counter++;
    if (this.counter == this.nbCardsPerPage) {
      this.counter = 0;
      this.imagesLoaded = true;
    }
  }
}
