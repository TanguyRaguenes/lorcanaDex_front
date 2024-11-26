import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Deck } from '../../models/Deck';
import { DecksService } from '../../services/decks.service';
import { Router } from '@angular/router';
import { CardsService } from '../../services/cardsService';
import { FlashMessageComponent } from '../flash-message/flash-message.component';
import { FlashMessageService } from '../../services/flash-message.service';
import { Subscription } from 'rxjs';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.scss'
})
export class DecksComponent implements OnInit, OnDestroy {


  // ATTRIBUTS

  private subscription = new Subscription();

  // Variables
  protected userDecks: Array<Deck> = [];
  protected colors: Array<string> = [];
  protected rarities: Array<string> = [];
  protected inksSelected: Array<string> = [];
  protected deckNameChosen: string = "";
  protected showErrorDeckNameChosenAlreadyUsed: boolean = false;
  protected showErrorNoDeckNameChosen: boolean = false;
  protected showErrorNoInkSelected: boolean = false;
  protected isModalVisible: boolean = false;



  // CONSTRUCTEUR

  constructor(private cardsService: CardsService, private deckService: DeckService, private decksService: DecksService, private router: Router, private flashMessageService: FlashMessageService) {

  }

  ngOnInit(): void {

    this.cardsService.resetColors();
    this.colors = [...this.cardsService.getColors()];
    this.cardsService.resetCardsToDisplay();
    this.rarities = [...this.cardsService.getRarities()];

    // ABONNEMENTS

    this.subscription.add(
      this.decksService.getUserDecks().subscribe({
        next: (decks) => {
          this.userDecks = decks;
          console.log('Decks mis à jour :', this.userDecks);
        },
        error: (err) => {
          console.error('Error getUserDecks :', err);
          this.flashMessageService.setMessageType('error');
          this.flashMessageService.setMessageText('Error getUserDecks.', true);
        }
      })
    );

    this.decksService.updateUserDecks();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  // SHOW DECK DETAILS

  public showDeckDetails(deckId: number) {

    const deck: Deck | undefined = this.userDecks.find(e => e.getDeckId() == deckId)

    if (deck) {
      sessionStorage.setItem("deckSelected", JSON.stringify(deck))
      this.deckService.setDeck(deck)

      this.router.navigate(["/deckDetails"])
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
      this.flashMessageService.setMessageText("This deck name has already been chosen.", true)
      return;
    }

    if (this.inksSelected.length < 1) {
      this.flashMessageService.setMessageType("information")
      this.flashMessageService.setMessageText("You must select at least one ink.", true)
      return;
    }

    if (this.deckNameChosen === "") {
      this.flashMessageService.setMessageType("information")
      this.flashMessageService.setMessageText("You need to choose a name for your deck.", true)
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

      this.decksService.addUserDeck(deck).subscribe({
        next: (response: any) => {
          console.log(response);
          this.toggleModal();
          this.decksService.updateUserDecks();
          this.flashMessageService.setMessageType("success")
          this.flashMessageService.setMessageText("The creation of the deck is a success.", true)
          this.router.navigate(['/temporary']).then(() => {
            this.router.navigate(['/decks']);
          });
        }, error: (e => {
          this.flashMessageService.setMessageType("error")
          this.flashMessageService.setMessageText("Error creating deck.", true)
          console.log("Error addDeckToBdd : " + e)
          console.log(e);
        })

      });

    } else {
      console.log("username and/or deck are null")
    }

  }

  //SUPPRESSION DECK BDD

  public removeUserDeck(deckId: number | null) {

    this.decksService.removeUserDeck(deckId).subscribe({
      next: (response: JSON) => {
        this.decksService.updateUserDecks();
        console.log(response);
        this.flashMessageService.setMessageType("success")
        this.flashMessageService.setMessageText("The deletion of the deck was successful.", true)
        this.router.navigate(['/temporary']).then(() => {
          this.router.navigate(['/decks']);
        });

      }, error: (e => {
        this.flashMessageService.setMessageType("error")
        this.flashMessageService.setMessageText("Error deleting deck.", true)
        console.log("Error removeUserDeck : " + e)
        console.log(e);
      })
    });
  }



}
