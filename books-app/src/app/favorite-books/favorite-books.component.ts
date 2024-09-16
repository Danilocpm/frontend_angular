// favorite-books.component.ts
import { Component, OnInit } from '@angular/core';
import { FavoriteBookService, FavoriteBook } from '../favorite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-favorite-books',
  template: `
    <h2>Livros Favoritos</h2>
    
    <mat-form-field>
      <mat-label>Filtrar por Tag</mat-label>
      <mat-select [(value)]="selectedTag" (selectionChange)="filterBooks()">
        <mat-option value="">Todos</mat-option>
        <mat-option *ngFor="let tag of uniqueTags" [value]="tag">{{tag}}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-list>
      <mat-list-item *ngFor="let book of filteredBooks">
        {{book.book_id}} - Tag: {{book.tag}}
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    mat-form-field {
      margin-bottom: 20px;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, MatSelectModule, MatFormFieldModule] 
})
export class FavoriteBooksComponent implements OnInit {
  allBooks: FavoriteBook[] = [];
  filteredBooks: FavoriteBook[] = [];
  uniqueTags: string[] = [];
  selectedTag: string = '';

  constructor(private favoriteBookService: FavoriteBookService) {}

  ngOnInit() {
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
  }
}
