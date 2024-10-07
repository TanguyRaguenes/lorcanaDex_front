import { Component } from '@angular/core';

import { Card } from '../../models/Card';
import { CardsService } from '../../services/cards.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  public cardsArray: Array<Card> = [];
  public cardsToDisplay: Array<Card> = [];
  public page: number = 1;
  public nbCardsPerPage: number = 9;

  constructor(private readonly cardsService: CardsService) {
    // this.loadCards();
    this.getDataFromApiBack();
  }


  public loadCards() {


    this.cardsService.getCards().subscribe(
      {

        next: (response: any) => {
          this.cardsArray = [];
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
            // this.cardsArray.push(card);
          });

          console.log("Réponse API externe")
          console.log(this.cardsArray);


        }, error: (error: any) => {
          console.log('Some error happenned');
          console.error(error);
        }

      }

    )

  }


  public getDataFromApiBack() {
    const data = this.cardsService.getDataFromApiBack().subscribe({
      next: (response: any) => {
        console.log("Réponse API back")
        console.log(response);
        this.cardsArray = [];
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
          this.cardsArray.push(card);
        });
        console.log({
          "cardsArray": this.cardsArray,
          "length": this.cardsArray.length
        })
        this.displayCards();
      }
    })

  }

  public displayCards() {
    console.log(`page: ${this.page}`)
    this.cardsToDisplay = [];
    const startIndex = (this.page - 1) * this.nbCardsPerPage;
    const endIndex = startIndex + this.nbCardsPerPage;
    this.cardsToDisplay = this.cardsArray.slice(startIndex, endIndex);
    console.log({
      "cardsToDisplay": this.cardsToDisplay
    }

    )
  }

  public nextPage() {
    console.log("nextPage")
    console.log(`page: ${this.page}`)
    console.log(`${this.cardsArray.length}`)
    if ((this.page * this.nbCardsPerPage) < this.cardsArray.length) {
      this.page++;
      console.log(`page: ${this.page}`)
      this.displayCards();
    }
  }

  public previousPage() {
    console.log("previousPage")
    console.log(`page: ${this.page}`)
    if (this.page > 1) {
      this.page--;
      console.log(`page: ${this.page}`)
      this.displayCards();
    }
  }
}
