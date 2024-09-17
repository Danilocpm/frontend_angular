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

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  } 

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

  searchReviews(order: 'asc' | 'desc' = 'asc'): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}list_by_rating/?order=${order}`;
    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching reviews:', error);
        return throwError(() => new Error('Failed to fetch reviews'));
      })
    );
  }

  editReview(reviewId: string, newRating: number, newReview: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { rating: newRating, review: newReview };
    const url = `${this.apiUrl}${reviewId}/edit_review/`; // Ajusta a URL para incluir o endpoint correto
    return this.http.patch(url, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error editing review:', error);
        return throwError(() => new Error('Failed to edit review'));
      })
    );
  }
}


