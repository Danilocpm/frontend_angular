import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service'; // Ajuste o caminho conforme necessário
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { forkJoin } from 'rxjs';
import { map } from 'rxjs';

interface Review {
  id: string;
  book_id: string;
  rating: number;
  review: string;
  bookTitle?: string;
  bookThumbnail?: string;
}



@Component({
  selector: 'app-review-books',
  templateUrl: './review-books.component.html',
  styleUrls: ['./review-books.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ReviewBooksComponent implements OnInit {
  reviews: any[] = [];
  errorMessage: string = '';
  editForm: FormGroup;

  constructor(private reviewService: ReviewService, private fb: FormBuilder) {

    this.editForm = this.fb.group({
      reviewId: ['', Validators.required],
      newRating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      newReview: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReviews('asc'); // Inicializa com reviews ordenadas de forma crescente
  }

  loadReviews(order: 'asc' | 'desc'): void {
    this.reviewService.searchReviews(order).subscribe({
      next: (data: Review[]) => {
        // Para cada review, buscar detalhes do livro
        const reviewDetails$ = data.map((review: Review) => 
          this.reviewService.getBookDetails(review.book_id).pipe(
            map(bookDetails => ({
              ...review,
              bookTitle: bookDetails.title,
              bookThumbnail: bookDetails.imageLinks.thumbnail
            }))
          )
        );

        // Executa todas as requisições de detalhes do livro em paralelo
        forkJoin(reviewDetails$).subscribe({
          next: (detailedReviews: Review[]) => {
            this.reviews = detailedReviews;
          },
          error: (error) => {
            console.error('Error fetching book details:', error);
            this.errorMessage = 'Failed to load book details';
          }
        });
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.errorMessage = 'Failed to load reviews';
      }
    });
  }

  editReview(): void {
    if (this.editForm.valid) {
      const { reviewId, newRating, newReview } = this.editForm.value;
      this.reviewService.editReview(reviewId, newRating, newReview).subscribe(
        (response) => {
          console.log('Review edited:', response);
          this.loadReviews('asc'); // Reload reviews after editing
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
  }

  deleteReview(reviewId: string): void {
    this.reviewService.deleteReview(reviewId).subscribe(
      () => {
        console.log('Review deleted');
        this.loadReviews('asc'); // Reload reviews after deletion
      },
      (error) => {
        console.error('Error deleting review:', error);
        this.errorMessage = 'Failed to delete review';
      }
    );
  }
}