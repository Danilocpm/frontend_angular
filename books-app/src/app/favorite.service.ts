import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Adjust the path as necessary
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl = 'http://localhost:8000/api/favorites/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addFavorite(bookId: string): Observable<any> {
    const token = this.authService.getToken(); // Retrieve the access token
    console.log('Token:', token); // Verifique se o token está correto
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
    });
  
    console.log('Headers:', headers); // Verifique os headers
  
    return this.http.post(this.apiUrl, { book_id: bookId }, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding favorite:', error);
        return throwError(() => new Error('Failed to add favorite'));
      })
    );
  }

  getFavorites(): Observable<any[]> {
    const token = this.authService.getToken(); // Retrieve the access token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
    });
  
    console.log('Headers:', headers); // Log the headers to verify
  
    return this.http.get<any[]>(this.apiUrl, { headers });}}