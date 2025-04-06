import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
// This service handles authentication logic
export class AuthService {
  private apiUrl = 'https://test.willay.ai/cotizador/api/token/';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    // Mock API response (replace with real backend URL later)
    return this.http.post<{ token: string }>(this.apiUrl, { username, password })
    .pipe(catchError(this.handleError));
  }

    // Store the token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Retrieve the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Clear the token (for logout)
  clearToken(): void {
    localStorage.removeItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Invalid username or password';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}