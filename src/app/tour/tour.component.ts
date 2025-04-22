import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as tour_data from "./tour_data.json";
import { CountryService } from '../country.service';
import { Tour } from '../../tour';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

class Tourist{
  constructor(
    public first_name:string,
    public last_name:string,
    public email:string,
    public phone:string,
    public option:number
  ) {}
}

@Component({
  selector: 'app-tour',
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet, NgFor, FormsModule],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss'
})
export class TourComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  countryService = inject(CountryService);
  tour: Tour | undefined;
  countryId: number = 0;
  newTourist = new Tourist("", "", "", "", 0);
  tourists: Tourist[] = [];
  was_added: string = "";

  constructor() {
    this.countryId = Number(this.route.snapshot.params['id']);
    this.tour = this.countryService.getTourById(this.countryId);
  }

  addTourist(form: NgForm){
    if (form.value.first_name && form.value.last_name && form.value.email && form.value.phone) {
      this.tourists.push(
        {
          first_name:form.value.first_name,
          last_name:form.value.last_name,
          email:form.value.email,
          phone:form.value.phone,
          option:form.value.option
        }
      )

      this.was_added = "Thank you for submitting. We are going to contact yon soon!"

      console.log(this.tourists);
    }
    }
}
