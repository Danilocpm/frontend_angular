import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtInterceptor, JWT_OPTIONS } from '@auth0/angular-jwt';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; // Import necessário
import { FormsModule } from '@angular/forms'; // Import do FormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms'; 

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    importProvidersFrom(FormsModule, MatDialogModule, MatInputModule, BrowserAnimationsModule, NoopAnimationsModule, MatListModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule), // Adicionar FormsModule aqui
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8000'],
        disallowedRoutes: ['localhost:8000/api/token/'],
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }, provideAnimationsAsync()
  ]
})
.catch(err => console.error(err));
