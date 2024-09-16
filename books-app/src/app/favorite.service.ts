// favorite-book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';  // Certifique-se de ajustar o caminho conforme necessário

@Injectable({
  providedIn: 'root',
})
export class FavoriteBookService {
  private apiUrl = 'http://localhost:8000/api/favorites/'; // Altere para o endpoint correto

  constructor(private http: HttpClient, private authService: AuthService) {}

  addFavoriteBook(bookId: string, tag: string = ''): Observable<any> {
    const token = this.authService.getToken();
    console.log('Token:', token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });


    console.log('Headers:', headers);

    return this.http.post<any>(this.apiUrl, { book_id: bookId, tag: tag }, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding favorite book:', error);
        return throwError(() => new Error('Failed to add favorite book'));
      })
    );
  }

  removeFavoriteBook(bookId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Assumindo que o endpoint para remover um livro favorito é /{bookId}
    return this.http.delete<any>(`${this.apiUrl}${bookId}/`, { headers }).pipe(
      catchError((error) => {
        console.error('Error removing favorite book:', error);
        return throwError(() => new Error('Failed to remove favorite book'));
      })
    );
  }

  getFavoriteBooks(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching favorite books:', error);
        return throwError(() => new Error('Failed to fetch favorite books'));
      })
    );
  }
}