import { Injectable } from '@angular/core';
import { Country } from '../country';
import { Comments } from '../comments';
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
  protected comments: Comments[] = (comments_data as any).default;
  protected tour_data: Tour[] = (tour_data as any).default;

  constructor(private http: HttpClient) {}

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

  getTourById(id: number): Tour | undefined {
    return this.tour_data.find((tour) => tour.country_id === id);
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

  sendLike(id: number) {
    this.http.post(`http://127.0.0.1:8000/api/comments/${id}/likes`, {});
  }
}
