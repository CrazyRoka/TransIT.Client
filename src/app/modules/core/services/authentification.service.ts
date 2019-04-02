import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Token } from '../models/token/token';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  token: Token;

  constructor(private http: HttpClient) {
    const tokenString = localStorage.getItem('userToken');
    if (tokenString) {
      this.token = JSON.parse(tokenString);
    }
  }

  getToken(): Token {
    return this.token;
  }

  setToken(token: Token): void {
    localStorage.setItem('userToken', JSON.stringify(token));
    this.token = token;
  }

  isTokenExpired(): boolean {
    if (!this.token) {
      return true;
    }

    const date = this.getTokenExpirationDate();
    return !date || date.valueOf() <= new Date().valueOf();
  }

  login(login: string, password: string): Observable<User> {
    return this.http
      .post<Token>(`${environment.apiUrl}/login`, {
        login,
        password
      })
      .pipe(
        tap(this.handleSuccess),
        map(token => token.user),
        catchError(this.handleError)
      );
  }

  private getTokenExpirationDate(): Date {
    try {
      const decoded: any = jwt_decode(this.token.accessToken);
      if (decoded.exp == null) {
        return null;
      }
      const date = new Date(decoded.exp * 1000);
      return date;
    } catch (Error) {
      return null;
    }
  }

  private handleSuccess(token: Token): void {
    console.log('Fetched token: ', token);
    this.setToken(token);
  }

  private handleError(httpResponse: HttpErrorResponse): Observable<any> {
    console.error('Error on login:', httpResponse);
    const { errors } = httpResponse.error;
    for (const field in errors) {
      if (field in errors) {
        for (const error of errors[field]) {
          console.error(field, error);
        }
      }
    }
    return throwError(httpResponse);
  }
}
