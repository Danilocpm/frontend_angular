import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { ReviewService } from '../review.service';
import { AuthService } from '../auth.service';
import { FavoriteBookService } from '../favorite.service';
import { FavoriteFormComponent } from '../favorite-form/favorite-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-search',
  standalone: true,
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
  imports: [CommonModule, FormsModule, MatSnackBarModule]  // Importa módulos necessários diretamente
})
export class BookSearchComponent {
  books: any[] = [];
  query: string = '';
  filter: 'intitle' | 'inauthor' = 'intitle';
  maxLength: number = 200; // Define o comprimento máximo da descrição
  favoriteBookIds: string[] = [];

  constructor(private bookService: BookService, private favoriteBookService: FavoriteBookService, public dialog: MatDialog, private reviewService: ReviewService, private authService: AuthService, private snackBar: MatSnackBar) {}

  search(): void {
    this.bookService.searchBooks(this.query, this.filter).subscribe((data) => {
      this.books = data.items.map((book: any) => ({
        ...book,
        expanded: false  // Inicializa a propriedade expanded como false
      }));
    });
  }

  openReviewDialog(bookId: string): void {
    const dialogRef = this.dialog.open(ReviewFormComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { bookId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Review submitted:', result);

        // Chama o serviço para submeter a review
        this.reviewService.submitReview(bookId, result.rating, result.review).subscribe(
          response => {
            console.log('Review successfully submitted:', response);
            // Aqui você pode adicionar lógica para atualizar a UI ou mostrar uma mensagem de sucesso
          },
          error => {
            console.error('Error submitting review:', error);
            // Aqui você pode adicionar lógica para mostrar uma mensagem de erro
          }
        );
      }
    });
  }

addToFavorites(bookId: string): void {
    const dialogRef = this.dialog.open(FavoriteFormComponent, {
      width: '400px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { bookId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Favorite book data:', result);

        this.favoriteBookService.addFavoriteBook(bookId, result.tag).subscribe(
          (response: Response) => {
            console.log('Book added to favorites:', response);
            this.showSuccessMessage('Livro adicionado aos favoritos com sucesso!');
          },
          (error: Error) => {
            console.error('Error adding book to favorites:', error);
            this.showErrorMessage('Erro ao adicionar livro aos favoritos. Tente novamente.');
          }
        );
      }
    });
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', { duration: 3000 });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', { duration: 5000 });
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



