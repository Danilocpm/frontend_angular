import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  standalone: true,
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
  imports: [CommonModule, FormsModule]  // Importa módulos necessários diretamente
})
export class BookSearchComponent {
  books: any[] = [];
  query: string = '';
  filter: 'intitle' | 'inauthor' = 'intitle';

  constructor(private bookService: BookService) {}

  search(): void {
    this.bookService.searchBooks(this.query, this.filter).subscribe((data) => {
      this.books = data.items;
    });
  }
}

