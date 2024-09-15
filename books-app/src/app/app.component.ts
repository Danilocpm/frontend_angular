import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    BookSearchComponent,
    LoginComponent,
    RegisterComponent,
  ]
})
export class AppComponent {
  title = 'books-app';

  constructor(private authService: AuthService, private router: Router) {}

}