import { Component, Input, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../country';
import * as data_long from "./data_long.json"
import { CountryService } from '../country.service';
import { Comments } from '../../comments';
import { CommentsComponent } from '../comments/comments.component';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-country',
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet, CommentsComponent, NgFor, FormsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  countryService = inject(CountryService);
  country: Country | undefined;
  comments: Comments[] | undefined = [];
  countryId: number = 0;
  new_id: number = 10000;
  @Input() comment!: Comments;
  @Input() form_comment!: Comments;

  constructor() {
    this.countryId = Number(this.route.snapshot.params['id']);
    this.country = this.countryService.getCountryById(this.countryId);
    this.comments = this.countryService.getCommentsById(this.countryId);
  }

  sendLike(comment: Comments) {
    comment.likes += 1;
  }
  
  submitComment(form: NgForm) {
    if (form.value.comment && form.value.username) {
      if (this.comments?.length !== undefined) {
        this.new_id = this.comments.length;
      }
  
      console.log(form.value.comment, form.value.username)
      this.comments?.push(
        {
          country_id: this.countryId,
          id: this.new_id,
          text: form.value.comment,
          username: form.value.username,
          avatar_image: './assets/user-icon-1.png',
          likes: 0
        }
      )
    }
  }
}
