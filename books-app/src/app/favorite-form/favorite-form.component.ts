// favorite-form.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorite-form',
  templateUrl: './favorite-form.component.html',
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