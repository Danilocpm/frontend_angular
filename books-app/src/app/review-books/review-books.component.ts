import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service'; // Ajuste o caminho conforme necessário
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 


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
      next: (data) => {
        this.reviews = data;
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
}