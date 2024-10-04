import { Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [

    {path: 'cards', component: CardsComponent},
    {path: 'card/:id', component: CardComponent},

    
];
