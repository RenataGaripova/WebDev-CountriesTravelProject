import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  imports:[FormsModule, RouterModule],
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(form: NgForm) {
    const data = {
      username: form.value.email,
      password: form.value.password
    };
  
    this.http.post<any>('http://localhost:8000/api/token/', data)
      .subscribe({
        next: (res) => {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          this.router.navigate(['']);
        },
        error: (err) => {
          alert('Login failed');
          console.error(err);
        }
      });
  }
}

