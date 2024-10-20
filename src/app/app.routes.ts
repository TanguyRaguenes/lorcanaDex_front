import { Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { DecksComponent } from './components/decks/decks.component';
import { DeckComponent } from './components/deck/deck.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

    { path: '', component: AuthComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cards', component: CardsComponent, canActivate: [AuthGuard] },
    { path: 'deck', component: DeckComponent, canActivate: [AuthGuard] },
    { path: 'decks', component: DecksComponent, canActivate: [AuthGuard] },
    // { path: 'card/:id', component: CardComponent },

];