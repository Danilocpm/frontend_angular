// book-details-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookDetails } from '../favorite.service';

@Component({
  selector: 'app-book-details-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <img [src]="data.imageLinks.thumbnail" alt="{{ data.title }} capa">
      <p><strong>Autores:</strong> {{ data.authors.join(', ') }}</p>
      <p><strong>Descrição:</strong> {{ data.description }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Fechar</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButtonModule]
})
export class BookDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookDetails
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}