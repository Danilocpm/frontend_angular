// favorite-form.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorite-form',
  template: `
    <h2 mat-dialog-title>Adicionar aos Favoritos</h2>
    <mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="Tag (opcional)" [(ngModel)]="tag">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button color="primary" (click)="onSubmit()">Adicionar</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class FavoriteFormComponent {
  tag: string = '';

  constructor(
    public dialogRef: MatDialogRef<FavoriteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({ tag: this.tag });
  }
}