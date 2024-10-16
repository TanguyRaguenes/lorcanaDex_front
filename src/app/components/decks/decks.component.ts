import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Deck } from '../../models/Deck';
import { DecksService } from '../../services/decks.service';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.scss'
})
export class DecksComponent {


  // ATTRIBUTS

  public inkImgNameArray: Array<string>;

  public inkSelected: Array<string>;

  public decksName: string;

  private decksService: DecksService;


  // CONSTRUCTEUR

  constructor(decksService: DecksService) {

    this.inkSelected = [];
    this.inkImgNameArray = [
      "Amber.png", "Amethyst.png", "Emerald.png", "Ruby.png", "Sapphire.png", "Steel.png"
    ];
    this.decksName = "";
    this.decksService = decksService;

  }


  // AFFICHAGE DE LA MODAL

  public ToggleVisibilityFiltersModal() {

    const filtersModal = document.getElementById("filtersModal") as HTMLDivElement;

    if (filtersModal.classList.contains("hidden")) {

      filtersModal.classList.remove("hidden");
      filtersModal.classList.add("block");

    } else {

      filtersModal.classList.remove("block");
      filtersModal.classList.add("hidden");

    }

  }

  // AFFICHAGE INKS

  public toggleDisplay(element: HTMLImageElement): void {

    console.log(element.id)


    if (element.classList.contains("grayscale") && this.inkSelected.length < 2) {
      element.classList.remove("grayscale");
      element.classList.add("grayscale-0");
      element.classList.add("scale-150");
      this.inkSelected.push(element.id);
    } else {


      element.classList.contains("grayscale") ? null : this.inkSelected = this.inkSelected.filter(e => e != element.id);

      element.classList.add("grayscale");
      element.classList.remove("grayscale-0")
      element.classList.remove("scale-150");

    }

    console.log(this.inkSelected)

  }

  public addNewFilter(eventTarget: EventTarget | null) {

    if (eventTarget instanceof HTMLImageElement) {

      this.toggleDisplay(eventTarget);

    }

  }

  //CREATION DU DECK

  public addDeckToBdd(): void {

    const deck = new Deck(

      this.decksName,
      "tanguy.raguenes@gmail.com",
      new Date(),
      new Date(),
      this.inkSelected[0],
      this.inkSelected[1],

    );

    this.decksService.addDeckToBdd(deck).subscribe({
      next: (response: any) => {
        console.log(response);
      }, error: (e => {
        console.log(e);
      })

    });


  }



}
