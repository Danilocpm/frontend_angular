import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { FavoriteBooksComponent } from './favorite-books/favorite-books.component';
import { ReviewBooksComponent } from './review-books/review-books.component';


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
    FavoriteBooksComponent,
    ReviewBooksComponent
 
  ]
})
export class AppComponent {
  title = 'books-app';

  constructor(private authService: AuthService, private router: Router) {}

}