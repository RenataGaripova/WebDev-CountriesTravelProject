import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  imports:[FormsModule],
  selector: 'app-signup',
  templateUrl: './log-up.component.html',
  styleUrl: './log-up.component.scss'
})
export class LogupComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  signUp(form: any) {
    const userData = {
      email: form.value.email,
      password: form.value.password
    };

    this.http.post<any>('http://localhost:8000/api/register/', userData)
      .subscribe({
        next: (res) => {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Signup error', err);
          alert('Sign-up failed: ' + err.error.error);
        }
      });
  }
}
