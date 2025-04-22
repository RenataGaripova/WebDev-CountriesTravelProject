import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { CountriesListComponent } from '../countries-list/countries-list.component';
import { CountryComponent } from '../country/country.component';
import { CountriesList } from '../../countries-list';
import { Location } from '@angular/common';
import  data from  "./data.json"

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterOutlet, CountriesListComponent,CountryComponent,CommonModule],
  templateUrl: './menu.component.html',
  // styleUrl: './menu.component.scss',
  styleUrls: ['./menu.component.scss'],
  standalone:true 
})
export class MenuComponent {
  constructor(private router: Router){
  }
  // list_countries:CountriesList[]=[];
  list_countries:CountriesList[]=[ {
    "id":0,
    "image":"./assets/ger-flag.png",
    "name":"Germany",
    "description":"Germany, officially the Federal Republic of Germany,is a country in Central Europe..."
  },
  {
    "id":1,
    "image":"./assets/netherlands-flag.png",
    "name":"The Netherlands",
    "description":"The Netherlands, informally Holland, is a country in Northwestern Europe..."
  },
  {
    "id":2,
    "image":"./assets/france-flag.png",
    "name":"France",
    "description":"France, officially the French Republic, is a country located primarily in ..."
  },
  {
    "id":3,
    "image":"./assets/britain-flag.png",
    "name":"The Great Britain",
    "description":"Great Britain is an island in the North Atlantic Ocean..."
  },
  {
    "id":4,
    "image":"./assets/canada-flag.png",
    "name":"Canada",
    "description":"Canada is a country in North America..."
  },
  {
    "id":5,
    "image":"./assets/japan-flag.png",
    "name":"Japan",
    "description":"Japan is an island country in East Asia. Located in the Pacific Ocean..."
  },


  ]
  list_countriesGrouped: CountriesList[][] = [];

  onNavigate(event: Event) {
    const target = event.target as HTMLSelectElement;
    const location = target.value;
    if (location) {
      this.router.navigate([location]); 
    }

   
  }

  ngOnInit(): void {
    // Group the countries into two arrays of three countries each on component initialization.
    this.list_countriesGrouped = [
      this.list_countries.slice(0, 3),
      this.list_countries.slice(3, 6)
    ];
  }

 
 
}
