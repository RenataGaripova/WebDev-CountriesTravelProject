import { bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { JwtModule } from '@auth0/angular-jwt';
import { importProvidersFrom } from '@angular/core';
import { AuthInterceptor } from './app/auth.interceptor';

export function tokenGetter() {
  return localStorage.getItem('jwt_token');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8000'],
          disallowedRoutes: ['localhost:8000/api/token-auth/'],
        },
      })
    )
  ],
});