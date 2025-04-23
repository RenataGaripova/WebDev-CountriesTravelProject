import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { CountriesListComponent } from '../countries-list/countries-list.component';
import { CountryComponent } from '../country/country.component';
import { CountriesList } from '../../countries-list';
import { Location } from '@angular/common';
import { FormControlDirective, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
// import data from './data.json';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  // styleUrl: './menu.component.scss',
  styleUrls: ['./menu.component.scss'],
  standalone: true, // <-- also note the correction here
})
export class MenuComponent {
  constructor(private router: Router, public authService: AuthService) {}

  countries: string[] = [
    'Netherlands',
    'Germany',
    'France',
    'The Great Britain',
    'Canada',
    'Japan',
  ];

  userInput: string = '';
  navigateToSignIn() {
    this.router.navigate(['/log-in']); // Navigate to the 'about' route
  }

  navigateToCountries() {
    this.router.navigate(['/countrieslist']);
  }

  findCountry() {
    let cnt = 1;

    for (let i of this.countries) {
      if (i == this.userInput) {
        this.router.navigate(['/country', cnt]);
        return;
      }
      cnt += 1;
    }
    window.alert('No such country!');
  }

  // navigateToHome() {
  //   this.router.navigate(['/home']);
  // }
}
