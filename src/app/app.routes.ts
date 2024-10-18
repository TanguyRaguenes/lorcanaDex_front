import { Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DecksComponent } from './components/decks/decks.component';
import { DeckComponent } from './components/deck/deck.component';

export const routes: Routes = [

    { path: '', component: LoginFormComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cards', component: CardsComponent },
    { path: 'deck', component: DeckComponent },
    { path: 'decks', component: DecksComponent },
    // { path: 'card/:id', component: CardComponent },

];