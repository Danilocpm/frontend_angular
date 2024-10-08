// favorite-books.component.ts
import { Component, OnInit } from '@angular/core';
import { FavoriteBookService, FavoriteBook, BookDetails } from '../favorite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookDetailsDialogComponent } from './book-details-dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; 

@Component({
  selector: 'app-favorite-books',
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, MatSelectModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatDialogModule, MatIconModule ] 
})
export class FavoriteBooksComponent implements OnInit {
  allBooks: FavoriteBook[] = [];
  filteredBooks: FavoriteBook[] = [];
  uniqueTags: string[] = [];
  selectedTag: string = '';
  favoriteBooksDetails: BookDetails[] = [];
  

  constructor(private favoriteBookService: FavoriteBookService, private dialog: MatDialog, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadFavoriteBooks();
  }

  loadFavoriteBooks() {
    this.favoriteBookService.getFavoriteBooks().subscribe(
      books => {
        this.allBooks = books;
        this.filteredBooks = books;
        this.extractUniqueTags();
      },
      error => console.error('Error loading favorite books:', error)
    );
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  extractUniqueTags() {
    this.uniqueTags = Array.from(new Set(this.allBooks.map(book => book.tag)))
      .filter(tag => tag !== '') // Remove tags vazias
      .sort(); // Ordena as tags alfabeticamente
  }

  filterBooks() {
    if (this.selectedTag === '') {
      this.filteredBooks = this.allBooks;
    } else {
      this.filteredBooks = this.allBooks.filter(book => book.tag === this.selectedTag);
    }
    this.loadBookDetails();
  }

  loadBookDetails() {
    this.favoriteBooksDetails = [];
    const bookDetailsObservables = this.filteredBooks.map(book => 
      this.favoriteBookService.getBookDetails(book.book_id)
    );

    forkJoin(bookDetailsObservables).subscribe(
      details => {
        this.favoriteBooksDetails = details;
      },
      error => console.error('Error loading book details:', error)
    );
  }

  viewBookDetails(book: BookDetails) {
    // Opção 1: Abrir um diálogo
    this.dialog.open(BookDetailsDialogComponent, {
      width: '500px',
      data: book
    });
}   

removeFavoriteBook(bookId: string) {
  this.favoriteBookService.removeFavoriteBook(bookId).subscribe({
    next: () => {
      console.log('Book removed successfully');
      // Atualiza a lista de livros favoritos após a remoção
      this.loadFavoriteBooks();
    },
    error: (error) => {
      console.error('There was an error removing the book:', error);
    }
  });
}
}

