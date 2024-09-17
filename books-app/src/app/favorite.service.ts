// favorite-book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, map, switchMap} from 'rxjs/operators';
import { AuthService } from './auth.service';  // Certifique-se de ajustar o caminho conforme necessário



export interface FavoriteBook {
  id: number;
  book_id: string;
  tag: string;
  // Adicione outros campos relevantes aqui
}

export interface BookDetails {
  id: string;
  title: string;
  authors: string[];
  description: string;
  imageLinks: {
    thumbnail: string;
  };
}


@Injectable({
  providedIn: 'root',
})
export class FavoriteBookService {
  private apiUrl = 'http://localhost:8000/api/favorites/'; // Altere para o endpoint correto
  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes';

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

  getFavoriteBooks(): Observable<FavoriteBook[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<FavoriteBook[]>(this.apiUrl, { headers }).pipe(
      map(books => books.sort((a, b) => a.tag.localeCompare(b.tag))), // Ordena por tag
      catchError((error) => {
        console.error('Error fetching favorite books:', error);
        return throwError(() => new Error('Failed to fetch favorite books'));
      })
    );
  }

  getBookDetails(bookId: string): Observable<BookDetails> {
    return this.http.get<any>(`${this.googleBooksApiUrl}/${bookId}`).pipe(
      map(response => ({
        id: response.id,
        title: response.volumeInfo.title,
        authors: response.volumeInfo.authors || [],
        description: response.volumeInfo.description || '',
        imageLinks: response.volumeInfo.imageLinks || { thumbnail: '' }
      })),
      catchError(error => {
        console.error('Error fetching book details:', error);
        return throwError(() => new Error('Failed to fetch book details'));
      })
    );
  }

  removeFavoriteBook(bookId: string): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Fazendo a requisição DELETE para o endpoint de remoção
    return this.http.delete<void>(`${this.apiUrl}${bookId}/delete-favorite/`, { headers }).pipe(
      catchError((error) => {
        console.error('Error removing favorite book:', error);
        return throwError(() => new Error('Failed to remove favorite book'));
      })
    );
  }
}