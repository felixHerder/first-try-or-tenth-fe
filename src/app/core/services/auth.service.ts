import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {AuthRequest, AuthResponse} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8080/api/v1';
  private tokenKey = "auth_token";
  private userDetailsKey = "auth_user";

  private currentUserSubject = new BehaviorSubject<Object | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/users/login`, credentials).pipe(tap(response => {
      this.setSessions(response);
    }));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private loadUserFromStorage() {
    const token = this.getToken();
    const userDetails = localStorage.getItem(this.userDetailsKey);
    if (token && userDetails) {
      this.currentUserSubject.next(userDetails);
    }

  }

  private setSessions(authResult: AuthResponse) {
    localStorage.setItem(this.tokenKey, authResult.token);
    localStorage.setItem(this.userDetailsKey, JSON.stringify(authResult.userDetails));
    this.currentUserSubject.next(authResult.userDetails);
  }
}
