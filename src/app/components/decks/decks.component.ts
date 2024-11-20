import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Deck } from '../../models/Deck';
import { DecksService } from '../../services/decks.service';
import { Router } from '@angular/router';
import { CardsService } from '../../services/cardsService';
import { FlashMessageComponent } from '../flash-message/flash-message.component';
import { FlashMessageService } from '../../services/flash-message.service';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.scss'
})
export class DecksComponent implements OnInit {


  // ATTRIBUTS
  private cardsService: CardsService;
  private decksService: DecksService;
  private flashMessageService: FlashMessageService;
  private router: Router;

  private viewportScroller: ViewportScroller;

  protected colors: Array<string>;
  protected rarities: Array<string>;

  protected inksSelected: Array<string>;

  protected deckNameChosen: string;

  protected userDecks: Array<Deck>;

  protected showErrorDeckNameChosenAlreadyUsed: boolean;
  protected showErrorNoDeckNameChosen: boolean;
  protected showErrorNoInkSelected: boolean;

  protected isModalInitialized: boolean;
  protected isModalVisible: boolean;

  // CONSTRUCTEUR

  constructor(cardsService: CardsService, decksService: DecksService, router: Router, flashMessageService: FlashMessageService, viewportScroller: ViewportScroller) {

    this.cardsService = cardsService;
    this.cardsService.resetColors();
    this.cardsService.resetCardsToDisplay();
    this.decksService = decksService;
    this.flashMessageService = flashMessageService;
    this.router = router;
    this.colors = [...this.cardsService.getColors()];
    this.rarities = [...this.cardsService.getRarities()];


    this.inksSelected = [];
    this.deckNameChosen = "";
    this.userDecks = [];
    this.showErrorDeckNameChosenAlreadyUsed = false;
    this.showErrorNoDeckNameChosen = false;
    this.showErrorNoInkSelected = false;
    this.getDecksFromBdd();

    this.isModalVisible = false;
    this.isModalInitialized = false;

    this.viewportScroller = viewportScroller;
    this.viewportScroller.scrollToPosition([0, 0]);

  }

  ngOnInit(): void {
    this.isModalInitialized = true;
  }

  //METHODES :


  // AFFICHAGE MODAL

  public toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  // EDITER LE DECK


  public editDeck(deckId: number) {

    const deck: Deck | undefined = this.userDecks.find(e => e.getDeckId() == deckId)

    if (deck) {
      sessionStorage.setItem("deckSelected", JSON.stringify(deck))
      this.router.navigate(["/deck"])
    }

  }

  // AFFICHAGE + AJOUT AU TABLEAU -> INKS 

  public toggleGrayscale(id: string): void {

    const img = document.getElementById(id) as HTMLImageElement;

    if (img.classList.contains("grayscale") && this.inksSelected.length < 2) {
      img.classList.remove("grayscale");
      img.classList.add("grayscale-0");
      img.classList.add("scale-125");
      this.inksSelected.push(id);
    } else {
      img.classList.add("grayscale");
      img.classList.remove("grayscale-0")
      img.classList.remove("scale-125");
      this.inksSelected = this.inksSelected.filter(e => e != id);
    }

    console.log(this.inksSelected)

  }

  //AJOUT DECK BDD

  public addDeckToBdd(): void {

    this.showErrorDeckNameChosenAlreadyUsed = false;
    this.showErrorNoDeckNameChosen = false;
    this.showErrorNoInkSelected = false;

    const deckExists = this.userDecks.some((e: Deck) => e.getDeckName() === this.deckNameChosen);

    if (deckExists) {
      this.flashMessageService.setMessageType("information")
      this.flashMessageService.setMessageText("This deck name has already been chosen.")
      return;
    }

    if (this.inksSelected.length < 1) {
      this.flashMessageService.setMessageType("information")
      this.flashMessageService.setMessageText("You must select at least one ink.")
      return;
    }

    if (this.deckNameChosen === "") {
      this.flashMessageService.setMessageType("information")
      this.flashMessageService.setMessageText("You need to choose a name for your deck.")
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
          this.toggleModal();
          this.flashMessageService.setMessageType("success")
          this.flashMessageService.setMessageText("The creation of the deck is a success.")
        }, error: (e => {
          this.flashMessageService.setMessageType("error")
          this.flashMessageService.setMessageText("Error creating deck.")
          console.log("Error addDeckToBdd : " + e)
          console.log(e);
        })

      });

    } else {
      console.log("username and/or deck are null")
    }

    this.router.navigate(['/temporary']).then(() => {
      this.router.navigate(['/decks']);
    });

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
