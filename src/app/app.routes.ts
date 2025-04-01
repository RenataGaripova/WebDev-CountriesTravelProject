import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryComponent } from './country/country.component';
import { TourComponent } from './tour/tour.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogUpComponent } from './log-up/log-up.component';
export const routes: Routes = [
  {
    path: 'countrieslist',
    component: CountriesListComponent,
    title: 'Countries page',
  },
  {
    path: '',
    component: MenuComponent,
    title: 'Menu page',
  },
  {
    path:'country/:id',
    component: CountryComponent,
    title: 'Country Details',
  },
  {
    path:'log-in',
    component:LogInComponent
  },
  {
    path:'log-up',
    component:LogUpComponent
  },
  {
    path:'tours/:id',
    component: TourComponent,
    title: 'Tour Details',
  },
];
