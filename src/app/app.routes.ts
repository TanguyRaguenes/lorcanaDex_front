import { Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

export const routes: Routes = [

    { path: '', component: LoginFormComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cards', component: CardsComponent },
    { path: 'card/:id', component: CardComponent },

];