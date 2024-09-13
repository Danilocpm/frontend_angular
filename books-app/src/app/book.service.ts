import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(query: string, filter: 'intitle' | 'inauthor'): Observable<any> {
    const url = `${this.apiUrl}?q=${filter}:${query}`;
    return this.http.get<any>(url);
  }
}
