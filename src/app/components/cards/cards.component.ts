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

  public cardsArray:Array<Card>=[];

  constructor(private readonly cardsService:CardsService){
    this.loadCards();
    this.getDataFromApiBack();
  }


  public loadCards(){


      this.cardsService.getCards().subscribe(
        {
          
          next: (response: any) => {
            console.log('Successfully loaded')
            console.log(response)

            response.forEach((element:any) => {
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
            // console.log(card)
            this.cardsArray.push(card);
            });

            console.log(this.cardsArray);
   
            
          },error: (error: any) => {
            console.log('Some error happenned');
            console.error(error);
          }

        }

      )

  }


  public getDataFromApiBack(){
      console.log("getDataFromApiBack");
      const data = this.cardsService.getDataFromApiBack().subscribe({
        next : (response:any)=>{
          console.log("Voici la réponse du back !!!!!!!!!!!!!!!!")
          console.log(response);
        }
      })
    
  }

}
