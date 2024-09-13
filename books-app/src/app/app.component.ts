import { Component } from '@angular/core';
import { BookSearchComponent } from './book-search/book-search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, BookSearchComponent] // Importar BookSearchComponent e CommonModule
})
export class AppComponent {
  title = 'books-app';
}
