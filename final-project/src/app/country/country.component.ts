import { Component, Input, OnInit, inject} from '@angular/core';
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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country',
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet, CommentsComponent, NgFor, FormsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  countryService = inject(CountryService);
  country!: Country;
  comments: Comments[] | undefined = [];
  countryId: number = 0;
  new_id: number = 10000;
  @Input() comment!: Comments;
  @Input() form_comment!: Comments;

  constructor() {
    this.countryId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.countryService.getCountryById(this.countryId).subscribe((data: Country) => {this.country = data;});
    this.countryService.getCommentsById(this.countryId).subscribe({next: (data: any) => this.comments=data});
    console.log(this.comments);
  }

  sendLike(comment: Comments) {
    this.countryService.sendLike(comment);
    comment.likes+=1;
  }
  
  submitComment(form: any) {
    const new_comm: Comments = form.value;
    new_comm['avatar_image'] = "./assets/user-icon-1.png";
    new_comm['likes']=0;
    if (form.value.text && form.value.username) {
      if (this.comments?.length !== undefined) {
        this.new_id = this.comments.length;
        this.comments.push(form.value);
        this.countryService.postComment(this.countryId, new_comm);
        window.location.reload();
      }      
    }
  }
}
