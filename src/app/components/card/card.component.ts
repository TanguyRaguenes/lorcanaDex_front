import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { Card } from '../../models/Card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  public card?: Card;

  constructor(private readonly route: ActivatedRoute, private readonly cardsService: CardsService) {
    this.loadImage();
  }

  ngOnInit(): void {

  }

  public loadImage() {
    this.cardsService.getCardById(this.route.snapshot.paramMap.get('id')).subscribe({
      next: (response: Array<any>) => {
        console.log("getCardById", {
          response: response[0]
        }

        );

        if (response.length > 0) {

          this.card = new Card(
            response[0].Artist,
            response[0].Set_Name,
            response[0].Classifications,
            response[0].Date_Added,
            response[0].Set_Num,
            response[0].Color,
            response[0].Gamemode,
            response[0].Franchise,
            response[0].Image,
            response[0].ImageSmall,
            response[0].Cost,
            response[0].Inkable,
            response[0].Name,
            response[0].Type,
            response[0].Lore,
            response[0].Rarity,
            response[0].Flavor_Text,
            response[0].Unique_ID,
            response[0].Card_Num,
            response[0].Body_Text,
            response[0].Willpower,
            response[0].Card_Variants,
            response[0].Date_Modified,
            response[0].Strength,
            response[0].Set_ID

          );

        }

      }, error: (err: any) => console.log(err)
    })
  }

}
