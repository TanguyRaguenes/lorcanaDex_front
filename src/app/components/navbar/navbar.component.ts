import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  // ATTRIBUTS

  protected isModalInitialized: boolean;
  protected isModalOpen: boolean;
  private authService: AuthService
  private router: Router;

  // CONSTRUCTEUR

  constructor(authService: AuthService, router: Router) {
    this.authService = authService,
      this.router = router,
      this.isModalOpen = false,
      this.isModalInitialized = false
  }

  // METHODES

  ngOnInit(): void {
    this.isModalInitialized = true;
  }

  public logout() {
    this.authService.logout();
  }

  public toggleMenu() {
    this.isModalOpen = !this.isModalOpen;
  }

  hideMenu(): boolean {
    return this.router.url === '/' || this.router.url === '/registration' || this.router.url === '/deck';
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === `/${route}`;
  }



}
