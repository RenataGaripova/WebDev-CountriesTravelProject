import { Injectable } from '@angular/core';
import { Country } from '../country';
import { Comments } from '../comments';
import { Tour } from '../tour';
import * as data_long from './country/data_long.json'
import * as comments_data from './country/comments_data.json'
import * as tour_data from './tour/tour_data.json'
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  protected country_data: Country[] =(data_long as any).default;
  protected comments: Comments[] = (comments_data as any).default;
  protected tour_data: Tour[] = (tour_data as any).default;
  constructor() { }

  getCountryById(id: number): Country | undefined {
    return this.country_data.find((country) => country.id === id);
  }

  getCommentsById(id: number): Comments[] | undefined {
    return this.comments.filter((comment)=>comment.country_id === id);
  }

  getTourById(id: number): Tour | undefined {
    return this.tour_data.find((tour) => tour.country_id === id);
  }
}
