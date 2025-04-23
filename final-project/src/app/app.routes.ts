import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryComponent } from './country/country.component';
import { TourComponent } from './tour/tour.component';
import { LoginComponent } from './log-in/log-in.component';
import { LogupComponent } from './log-up/log-up.component';
import { ProfileComponent } from './profile/profile.component';
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
    component:LoginComponent
  },
  {
    path:'log-up',
    component:LogupComponent
  },
  {
    path:'tours/:id',
    component: TourComponent,
    title: 'Tour Details',
  },
  { path: 'profile', component: ProfileComponent },
];
