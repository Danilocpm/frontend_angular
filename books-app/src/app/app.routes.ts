import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { FavoriteBooksComponent } from './favorite-books/favorite-books.component';
import { ReviewBooksComponent } from './review-books/review-books.component';


export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'busca', component: BookSearchComponent },
  { path: 'favoritos', component: FavoriteBooksComponent},
  { path: 'reviews', component: ReviewBooksComponent}
];
