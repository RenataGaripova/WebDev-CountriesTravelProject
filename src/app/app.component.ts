import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, CountriesListComponent],
  template:`<div>
      <router-outlet></router-outlet>
  </div>
  `,  
  
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'Project';
}
