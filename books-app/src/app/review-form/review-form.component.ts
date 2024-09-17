import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Adicione esta importação
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule,], // Inclua CommonModule aqui
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  rating: number = 0;
  review: string = '';

  constructor(public dialogRef: MatDialogRef<ReviewFormComponent>) {}

  submitReview() {
    this.dialogRef.close({ rating: this.rating, review: this.review });
  }
}
