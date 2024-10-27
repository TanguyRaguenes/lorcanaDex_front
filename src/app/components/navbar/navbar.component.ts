import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  protected isModalInitialized: boolean;
  protected isModalOpen: boolean;

  constructor(private authService: AuthService) {
    this.isModalOpen = false;
    this.isModalInitialized = false;
  }
  ngOnInit(): void {
    this.isModalInitialized = true;
  }



  public logout() {
    this.authService.logout();
  }

  public toggleMenu() {
    this.isModalOpen = !this.isModalOpen;
  }



}
