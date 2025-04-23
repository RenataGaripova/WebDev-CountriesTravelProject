import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/token/';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }) {
    return this.http.post(this.baseUrl, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
      })
    );
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getAccessToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  getUserFromToken(): any | null {
    const token = this.getAccessToken();
    if (!token) return null;
  
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    } catch (err) {
      console.error('Token decode failed', err);
      return null;
    }
  }
  
  getUserEmail(): string | null {
    if (!this.isLocalStorageAvailable()) return null;
  
    const token = this.getAccessToken();
    if (!token) return null;
  
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded.email || null;
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

  
  
}