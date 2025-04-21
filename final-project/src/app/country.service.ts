import { Injectable } from '@angular/core';
import { Country } from '../country';
import { Comments } from '../comments';
import {CountriesList} from '../countries-list';
import { Tour } from '../tour';
import { HttpClient } from '@angular/common/http';
import * as data_long from './country/data_long.json'
import * as comments_data from './country/comments_data.json'
import * as tour_data from './tour/tour_data.json'
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  protected country_data: Country[] =(data_long as any).default;
  protected tour_data: Tour[] = (tour_data as any).default;

  constructor(private http: HttpClient) {}

  getCountryList(): Observable<CountriesList[]> {
    return this.http.get<CountriesList[]>(`http://127.0.0.1:8000/api/countrylist`).pipe(
      map(countrylist => 
        countrylist.map((country: any) => ({
          ...country
        }))
      )
    );
  }

  getCountryById(id: number): Observable<Country> {
    return this.http.get<{ data: Country }>(`http://127.0.0.1:8000/api/country/${id}/`).pipe(map(response => response.data));
  }

  getCommentsById(country_id: number): Observable<Comments[]>{
    return this.http.get<Comments[]>(`http://127.0.0.1:8000/api/country/${country_id}/comments`).pipe(
      map(comments => 
        comments.map(comment => ({
          ...comment
        }))
      )
    );
  }

  getTourById(country_id: number): Observable<Tour> {
    return this.http.get<{ data: Tour }>(`http://127.0.0.1:8000/api/country/${country_id}/tour`).pipe(map(response => response.data));
  }

  postComment(country_id: number, data: any) {
    this.http.post(`http://127.0.0.1:8000/api/country/${country_id}/comments`, data).subscribe({
      next: (res) => {
        console.log('Success:', res);
      },
      error: (err) => {
        console.error('Error posting comment:', err);
      }
    });
  }

  sendLike(comment: Comments) {
    console.log(comment.id);
    this.http.post(`http://127.0.0.1:8000/api/comments/${comment.id}/likes/`, {}).subscribe((res: any) => {
      comment.likes = res.likes;
    });
  }

  sendTouristForm(tour: Tour, data: any) {
    this.http.post(`http://127.0.0.1:8000/api/tour/${tour.id}/tourist`, data).subscribe({
      next: (res) => {
        console.log('Success:', res);
      },
      error: (err) => {
        console.error('Error posting tourist:', err);
      }
    });
  }
}
