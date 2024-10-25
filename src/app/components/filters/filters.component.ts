import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Filter } from '../../models/Filter';
import { FormsModule } from '@angular/forms';
import { CardsService } from '../../services/cardsService';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

  // ATTRIBUTS
  private cardsService: CardsService;

  protected nameFilter: string;
  protected colors: Array<string>;
  protected rarities: Array<string>;
  protected filters: Array<Filter>;


  // CONTRUCTEUR
  constructor(cardsService: CardsService) {
    this.cardsService = cardsService;
    this.nameFilter = "";
    this.filters = [];
    this.colors = [...this.cardsService.getColors()]
    this.rarities = [...this.cardsService.getRarities()];
  }

  // METHODES

  public toggleModal(): void {

    const modal = document.getElementById("modal") as HTMLDivElement;

    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden")
      modal.classList.add("block")
    } else {
      modal.classList.remove("block")
      modal.classList.add("hidden")
    }

  }

  public toggleGrayscale(id: string): void {

    const img = document.getElementById(id) as HTMLImageElement;

    if (img.classList.contains("grayscale")) {
      img.classList.remove("grayscale");
      img.classList.add("grayscale-0");
      img.classList.add("scale-150");
    } else {
      img.classList.add("grayscale");
      img.classList.remove("grayscale-0")
      img.classList.remove("scale-150");
    }
  }


  public addNewFilter(idImg: string | null, key: string, value: string): void {


    idImg != null ? this.toggleGrayscale(idImg) : null;

    let priority: number;

    switch (key) {
      case "color":
        priority = 1;
        break;
      case "rarity":
        priority = 2;
        break;

      case "name":
        priority = 10;
        break;

      default:
        priority = 10;
        break;
    }

    const filter = new Filter(priority, key, value);

    if (this.filters.some(e => e.getValue() === filter.getValue())) {
      this.filters = this.filters.filter(e => e.getValue() != filter.getValue())
    } else {
      this.filters.push(filter);
    }

    console.log({
      "filter": this.filters
    })

  }


  public filterCards(): void {

    this.filters = this.filters.filter(e => e.getKey() != "name");

    if (this.nameFilter != "" && this.nameFilter != null) {
      this.addNewFilter(null, "name", this.nameFilter)
    }

    console.log("filterCards")
    this.filters.sort((a, b) => a.getPriority() - b.getPriority())
    this.cardsService.filterCards(this.filters)

    this.toggleModal();

  }




}