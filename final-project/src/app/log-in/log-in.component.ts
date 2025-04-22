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

  login() {
    const credentials = {
      username: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:8000/api/token/', credentials)
      .subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid username or password');
        }
      });
  }
}

