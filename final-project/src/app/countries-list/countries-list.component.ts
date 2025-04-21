import { Component, OnInit, Input, inject } from '@angular/core';
import { CountriesList } from '../../countries-list';
import { CountryService } from '../country.service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import * as data_short from "./data_short.json";
@Component({
  selector: 'app-countries-list',
  imports: [RouterModule, RouterLink, RouterOutlet, NgFor, NgIf],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss',
})
export class CountriesListComponent implements OnInit{
  @Input() countriesList!: CountriesList;
  countryService = inject(CountryService);

  list_data: CountriesList[] | undefined = [];
  filtered_list_data: CountriesList[] | undefined = [];

  ngOnInit(){
    this.countryService.getCountryList().subscribe({next: (data: any) => this.list_data=data});
    this.countryService.getCountryList().subscribe({next: (data: any) => this.filtered_list_data=data})
  }

  constructor(){
  }

  

  filterResults(text: string) {
    if (!text) {
      this.filtered_list_data = this.list_data;
      return;
    }

    if (!this.list_data) {
      return;
    }
    this.filtered_list_data = this.list_data.filter((countriesList) =>
      countriesList?.name.toLowerCase().includes(text.toLowerCase()),
    );
  }

}
