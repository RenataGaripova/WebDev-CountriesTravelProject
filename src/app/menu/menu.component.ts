import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { CountriesListComponent } from '../countries-list/countries-list.component';
import { CountryComponent } from '../country/country.component';
import { CountriesList } from '../../countries-list';
import { Location } from '@angular/common';
import data from './data.json';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    RouterOutlet,
    CountriesListComponent,
    // CountryComponent,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  // styleUrl: './menu.component.scss',
  styleUrls: ['./menu.component.css'],
  standalone: true, // <-- also note the correction here
})
export class MenuComponent {
  constructor(private router: Router) {}

  navigateToSignIn() {
    this.router.navigate(['/log-in']); // Navigate to the 'about' route
  }
}
