import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Deck } from '../../models/Deck';
import { DecksService } from '../../services/decks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.scss'
})
export class DecksComponent {


  // ATTRIBUTS

  protected inkImgNameArray: Array<string>;

  protected inksSelected: Array<string>;

  protected deckNameChosen: string;

  protected userDecks: Array<Deck>;

  protected showErrorDeckNameChosenAlreadyUsed: boolean;
  protected showErrorNoDeckNameChosen: boolean;
  protected showErrorNoInkSelected: boolean;

  // CONSTRUCTEUR

  constructor(private decksService: DecksService, private router: Router) {

    this.inksSelected = [];
    this.inkImgNameArray = [
      "Amber.png", "Amethyst.png", "Emerald.png", "Ruby.png", "Sapphire.png", "Steel.png"
    ];
    this.deckNameChosen = "";
    this.userDecks = [];
    this.showErrorDeckNameChosenAlreadyUsed = false;
    this.showErrorNoDeckNameChosen = false;
    this.showErrorNoInkSelected = false;
    this.getDecksFromBdd();

  }

  //METHODES :

  // EDITER LE DECK

  public editDeck(deckId: number) {

    const deck: Deck | undefined = this.userDecks.find(e => e.getDeckId() == deckId)

    if (deck) {
      sessionStorage.setItem("deckSelected", JSON.stringify(deck))
      this.router.navigate(["/deck"])
    }

  }

  // AFFICHAGE MODAL

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


    if (element.classList.contains("grayscale") && this.inksSelected.length < 2) {
      element.classList.remove("grayscale");
      element.classList.add("grayscale-0");
      element.classList.add("scale-150");
      this.inksSelected.push(element.id);
    } else {


      element.classList.contains("grayscale") ? null : this.inksSelected = this.inksSelected.filter(e => e != element.id);

      element.classList.add("grayscale");
      element.classList.remove("grayscale-0")
      element.classList.remove("scale-150");

    }

    console.log(this.inksSelected)

  }

  public addNewFilter(eventTarget: EventTarget | null) {

    if (eventTarget instanceof HTMLImageElement) {

      this.toggleDisplay(eventTarget);

    }

  }

  //AJOUT DECK BDD

  public addDeckToBdd(): void {

    this.showErrorDeckNameChosenAlreadyUsed = false;
    this.showErrorNoDeckNameChosen = false;
    this.showErrorNoInkSelected = false;

    const deckExists = this.userDecks.some((e: Deck) => e.getDeckName() === this.deckNameChosen);

    if (deckExists) {
      this.showErrorDeckNameChosenAlreadyUsed = true;
      return;
    }

    if (this.inksSelected.length < 1) {
      this.showErrorNoInkSelected = true;
      return;
    }

    if (this.deckNameChosen === "") {
      this.showErrorNoDeckNameChosen = true;
      return;
    }

    const username = sessionStorage.getItem('username');

    console.log(`addDeckToBdd ; username : ${username}`)

    if (username != null) {

      const deck = new Deck(
        null,
        this.deckNameChosen,
        username,
        new Date(),
        new Date(),
        this.inksSelected[0],
        this.inksSelected[1],

      );

      this.decksService.addDeckToBdd(deck).subscribe({
        next: (response: any) => {
          console.log(response);
          this.getDecksFromBdd();
          this.ToggleVisibilityFiltersModal();
        }, error: (e => {
          console.log(e);
        })

      });

    } else {
      console.log("username and/or deck are null")
    }

  }

  //RECUPERATION DECKS BDD

  public getDecksFromBdd(): void {
    this.userDecks = [];
    this.decksService.getDecksFromBdd().subscribe({
      next: (response: Deck[]) => {
        console.log(response);
        this.userDecks = response;
        console.log({
          "userDecks": this.userDecks
        })
      }, error: (e => {
        console.log(e)
      })
    })
  }

  //SUPPRESSION DECK BDD

  public removeDeckFromBdd(deckId: number | null) {
    this.decksService.removeDeckFromBdd(deckId).subscribe({
      next: (response: JSON) => {
        console.log(response);
        this.getDecksFromBdd()
      }, error: (e => {
        console.log(e);
      })
    });
  }

}
