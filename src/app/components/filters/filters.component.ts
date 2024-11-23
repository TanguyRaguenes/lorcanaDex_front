import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, OnInit } from '@angular/core';
import { Filter } from '../../models/Filter';
import { FormsModule } from '@angular/forms';
import { CardsService } from '../../services/cardsService';
import { SetApiLorcast } from '../../models/SetApiLorcast';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {

  // ATTRIBUTS
  private cardsService: CardsService;

  protected nameFilter: string;
  protected colors: Array<string>;
  protected rarities: Array<string>;
  protected filters: Array<Filter>;
  protected isModalInitialized: boolean;
  protected isModalVisible: boolean;
  protected sets: Array<SetApiLorcast> = [];


  // CONTRUCTEUR
  constructor(cardsService: CardsService) {
    this.cardsService = cardsService;
    this.nameFilter = "";
    this.filters = [];
    this.colors = [...this.cardsService.getColors()]
    this.rarities = [...this.cardsService.getRarities()];
    console.log({
      colors: this.colors,
      rarities: this.rarities
    });
    this.isModalVisible = false;
    this.isModalInitialized = false;

    this.cardsService.getSets().subscribe({
      next: (response: Array<SetApiLorcast>) => {
        // response.forEach(e => {
        //   console.log({
        //     set: e.getName()
        //   })
        // })
        this.sets = [...response]
      }, error: (e => {
        console.log("getSets error " + e)
      })
    });
  }
  ngOnInit(): void {

    this.isModalInitialized = true;

    window.addEventListener('popstate', (event) => {

      history.pushState(null, '', window.location.href);
      this.isModalVisible = false;

    });
  }

  // METHODES

  public toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  public toggleGrayscale(id: string): void {

    const img = document.getElementById(id) as HTMLImageElement;

    if (img.classList.contains("grayscale")) {
      img.classList.remove("grayscale");
      img.classList.add("grayscale-0");
      img.classList.add("scale-125");
    } else {
      img.classList.add("grayscale");
      img.classList.remove("grayscale-0")
      img.classList.remove("scale-125");
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
      case "set":
        priority = 3;
        break;
      case "name":
        priority = 10;
        break;

      default:
        priority = 10;
        break;
    }

    const filter = new Filter(priority, key, value);

    let AllowedToPush: boolean = true;

    if (filter.getKey() == "set") {
      this.filters = this.filters.filter(e => e.getKey() != "set")

      filter.getValue() === "all" ? AllowedToPush = false : null;
    }

    if (this.filters.some(e => e.getValue() === filter.getValue())) {
      this.filters = this.filters.filter(e => e.getValue() != filter.getValue())
    } else {
      if (AllowedToPush) {
        this.filters.push(filter);
      }

    }

    console.log({
      "filters": this.filters
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

  OnChangeSelectSet(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log(selectedValue);

    if (selectedValue !== null) {
      this.addNewFilter(null, "set", selectedValue);
    }

  }




}
