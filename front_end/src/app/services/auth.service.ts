import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   apiUrl = environment.baseurl;

  private baseUrl = this.apiUrl+'/api/auth';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient,private route:Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{token:string ,message:string,user:User}>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        map((response:any) => {
          const token = response.token;
          const user=response.user
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user',JSON.stringify(user) );

            this.tokenSubject.next(token);
          }
          return response;
        })
      
      
    );
  }
  private handleError(error: HttpErrorResponse):Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 401) {
        errorMessage = 'بيانات الاعتماد غير صالحة';
      } else {
        errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
      }
    }
    console.error(errorMessage);
    const err=new Error(errorMessage)
    return throwError(()=>err);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.tokenSubject.next(null);
    this.route.navigate(["/"])

  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserId(): string | null {
    var me = localStorage.getItem('user');
    var sender_id;
    if (me != null) {
      me = JSON.parse(me).id;
    }
    return me
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Convert to boolean
  }

  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
  
}
