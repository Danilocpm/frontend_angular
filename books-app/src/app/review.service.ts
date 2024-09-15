// review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';  // Certifique-se de ajustar o caminho conforme necessário

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:8000/api/reviews/'; // Altere para o endpoint correto

  constructor(private http: HttpClient, private authService: AuthService) {}

  submitReview(bookId: string, rating: number, review: string): Observable<any> {
    const token = this.authService.getToken(); // Pega o token de autenticação do usuário
      console.log('Token:', token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Inclui o token nos cabeçalhos
      'Content-Type': 'application/json'  // Define o tipo de conteúdo como JSON
    });

    console.log('Headers:', headers); // Verifique se os cabeçalhos estão corretos


    // Envia a review para o servidor
    return this.http.post<any>(this.apiUrl, {book_id: bookId, rating: rating, review: review}, { headers }).pipe(
      catchError((error) => {
        console.error('Error submitting review:', error);
        return throwError(() => new Error('Failed to submit review'));
      })
    );
  }
}

