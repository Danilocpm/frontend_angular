import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule

@Component({
  selector: 'app-review-form',
  standalone: true, // Adicione esta propriedade se estiver usando módulos standalone
  imports: [FormsModule, MatFormFieldModule, MatInputModule], // Importar módulos necessários
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
