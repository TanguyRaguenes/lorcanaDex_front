import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, OnDestroy, OnInit } from '@angular/core';
import { Filter } from '../../models/Filter';
import { FormsModule } from '@angular/forms';
import { CardsService } from '../../services/cardsService';
import { SetApiLorcast } from '../../models/SetApiLorcast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit, OnDestroy {

  // ATTRIBUTS

  protected nameFilter: string = "";
  protected textFilter: string = "";
  protected typeFilter: string = "";

  protected costFilter: number = 0;
  protected strengthFilter: number = 0;
  protected willpowerFilter: number = 0;
  protected loreFilter: number = 0;

  protected colors: Array<string>;
  protected rarities: Array<string>;
  protected filters: Array<Filter> = [];
  protected isModalVisible: boolean = false;
  protected sets: Array<SetApiLorcast> = [];
  private subscription: Subscription = new Subscription();

  protected operators: Array<string> = ['=', '>=', '<=', '>', '<']
  protected values: Array<String> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

  protected selectedCostOperator: string = "="
  protected selectedStrengthOperator: string = "="
  protected selectedWillpowerOperator: string = "="
  protected selectedLoreOperator: string = "="

  protected selectedCostOption: string = "="
  protected selectedStrengthOption: string = "="
  protected selectedWillpowerOption: string = "="
  protected selectedLoreOption: string = "="

  // CONTRUCTEUR
  constructor(private cardsService: CardsService) {

    this.colors = [...this.cardsService.getColors()]
    this.rarities = [...this.cardsService.getRarities()];

  }

  ngOnInit(): void {

    this.subscription.add(
      this.cardsService.getSets().subscribe({
        next: (response: Array<SetApiLorcast>) => {

          this.sets = [...response]
        }, error: (e => {
          console.log("getSets error " + e)
        })
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // METHODES

  protected resetFilters() {

    this.selectedCostOperator = "=";
    this.selectedStrengthOperator = "=";
    this.selectedWillpowerOperator = "=";
    this.selectedLoreOperator = "=";

    this.selectedCostOption = "all";
    this.selectedStrengthOption = "all";
    this.selectedWillpowerOption = "all";
    this.selectedLoreOption = "all";

    this.nameFilter = "";
    this.textFilter = "";
    this.typeFilter = "";

    document.querySelectorAll(".reset").forEach(img => {
      if (!img.classList.contains("grayscale")) {
        img.classList.add("grayscale");
        img.classList.remove("grayscale-0")
        img.classList.remove("scale-125");
      }
    });

    (document.getElementById("filterOnCardsName") as HTMLSelectElement).value = "all";

    this.filters = [];
    this.filterCards()

    console.log("Filters reset!");

  }


  protected OnChangeSelectOperator(event: Event, filter: string): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log(selectedValue);

    (this as any)[`selected${filter.charAt(0).toUpperCase() + filter.slice(1, filter.length)}Operator`] = selectedValue

    this.filters = this.filters.filter(e => e.getKey() != filter);

    if ((this as any)[`selected${filter.charAt(0).toUpperCase() + filter.slice(1, filter.length)}Option`] !== "all") {
      this.addNewFilter(null, filter, (this as any)[`selected${filter.charAt(0).toUpperCase() + filter.slice(1, filter.length)}Option`], selectedValue);
    }

  }

  protected OnChangeSelectOption(event: Event, filter: string): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log(selectedValue);

    (this as any)[`selected${filter.charAt(0).toUpperCase() + filter.slice(1, filter.length)}Option`] = selectedValue

    this.filters = this.filters.filter(e => e.getKey() != filter);

    if (selectedValue !== "all") {
      this.addNewFilter(null, filter, selectedValue, (this as any)[`selected${filter.charAt(0).toUpperCase() + filter.slice(1, filter.length)}Operator`]);
    }
  }


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


  // AJOUT D'UN FILTRE AU TABLEAU DES FILTRES

  public addNewFilter(idImg: string | null, key: string, value: string, operator: string): void {


    idImg != null ? this.toggleGrayscale(idImg) : null;

    // let priority: number;

    // switch (key) {
    //   case "color":
    //     priority = 1;
    //     break;
    //   case "rarity":
    //     priority = 2;
    //     break;
    //   case "set":
    //     priority = 3;
    //     break;
    //   case "type":
    //     priority = 4;
    //     break;
    //   case "cost":
    //     priority = 5;
    //     break;
    //   case "strength":
    //     priority = 6;
    //     break;
    //   case "willpower":
    //     priority = 7;
    //     break;
    //   case "lore":
    //     priority = 8;
    //     break;
    //   case "text":
    //     priority = 9;
    //     break;
    //   case "name":
    //     priority = 10;
    //     break;

    //   default:
    //     priority = 10;
    //     break;
    // }

    // const filter = new Filter(priority, key, value, operator);

    const filter = new Filter(key, value, operator);

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
    this.filters = this.filters.filter(e => e.getKey() != "text");
    this.filters = this.filters.filter(e => e.getKey() != "type");

    if (this.nameFilter != "" && this.nameFilter != null) {
      this.addNewFilter(null, "name", this.nameFilter, '')
    }



    if (this.textFilter != "" && this.textFilter != null) {
      this.addNewFilter(null, "text", this.textFilter, '')
    }



    if (this.typeFilter != "" && this.typeFilter != null) {
      this.addNewFilter(null, "type", this.typeFilter, '')
    }

    console.log("filterCards")
    // this.filters.sort((a, b) => a.getPriority() - b.getPriority())
    this.cardsService.filterCards(this.filters)

    this.toggleModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  OnChangeSelectSet(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log(selectedValue);

    if (selectedValue !== null) {
      this.addNewFilter(null, "set", selectedValue, '');
    }

  }




}
