import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './components/cards/cards.component';
import { DeckComponent } from './components/deck/deck.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormsModule, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lorcanaDex_front';

  constructor(private readonly router: Router) {

  }

  hideNavbar(): boolean {
    return this.router.url === '/';
    // return this.router.url === '/' || this.router.url === '/deck';
  }

}


