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
import { OnInit } from '@angular/core';
import { Tourist } from '../../tourist';

@Component({
  selector: 'app-tour',
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet, NgFor, FormsModule],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss'
})
export class TourComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  countryService = inject(CountryService);
  tour: Tour | undefined;
  countryId: number = 0;
  tourists: Tourist[] = [];
  was_added: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.route.params.subscribe(params => {
        this.countryId = +params['id'];
        this.countryService.getTourById(this.countryId).subscribe((data: Tour) => {
          this.tour = data;
        });
      });
    }
    )
  }
  addTourist(form: any) {
    
    if (form.value.first_name && form.value.last_name && form.value.email && form.value.phone_number) {
      
      if (form.value.option === undefined) {
        form.value.option=1;
      }

      const newTourist: Tourist = form.value;

      if (this.tour !== undefined) {
        this.countryService.sendTouristForm(this.tour, newTourist);
        this.was_added = "Thank you for submitting. We are going to contact yon soon!";
        console.log("added")
      }
      
    }
  }
}
