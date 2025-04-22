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
  standalone:true,
})
export class CountriesListComponent implements OnInit{
  @Input() countriesList!: CountriesList;
  
  list_data: CountriesList[] = (data_short as any).default;

  constructor(){}

  ngOnInit(){
    console.log(this.list_data);
  }
}
