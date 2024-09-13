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
  maxLength: number = 200; // Define o comprimento máximo da descrição

  constructor(private bookService: BookService) {}

  search(): void {
    this.bookService.searchBooks(this.query, this.filter).subscribe((data) => {
      this.books = data.items.map((book: any) => ({
        ...book,
        expanded: false  // Inicializa a propriedade expanded como false
      }));
    });
  }

  toggleExpand(book: any): void {
    // Atualiza apenas a propriedade expanded do livro clicado
    book.expanded = !book.expanded;
  }

  isLongDescription(description: string | undefined): boolean {
    return (description && description.length > this.maxLength) ? true : false;
  }

  getDescription(description: string | undefined, expanded: boolean): string {
    if (!description) return 'No description available';
    if (expanded || description.length <= this.maxLength) {
      return description;
    } else {
      return description.substring(0, this.maxLength) + '...';
    }
  }
}




