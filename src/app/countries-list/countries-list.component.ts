import { Component, OnInit, Input } from '@angular/core';
import { CountriesList } from '../../countries-list';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import * as data_short from "./data_short.json";
@Component({
  selector: 'app-countries-list',
  imports: [RouterModule, RouterLink, RouterOutlet, NgFor],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss',
})
export class CountriesListComponent implements OnInit{
  @Input() countriesList!: CountriesList;
  
  list_data: CountriesList[] = (data_short as any).default;
  filtered_list_data: CountriesList[] = [];

  constructor(){
    this.filtered_list_data=this.list_data;
  }

  ngOnInit(){}

  filterResults(text: string) {
    if (!text) {
      this.filtered_list_data = this.list_data;
      return;
    }
    this.filtered_list_data = this.list_data.filter((countriesList) =>
      countriesList?.name.toLowerCase().includes(text.toLowerCase()),
    );
  }

}
