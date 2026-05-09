import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthRequest, AuthResponse, UserControllerApiService, UserDetailsDTO } from '@core/api/v1';
import { HttpContext } from '@angular/common/http';
import { BYPASS_AUTH } from '@core/interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userApi = inject(UserControllerApiService);
  private tokenKey = 'auth_token';
  private userDetailsKey = 'auth_user';

  private currentUserSubject = new BehaviorSubject<UserDetailsDTO | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  login(credentials: AuthRequest) {
    return this.userApi
      .loginUser({ authRequest: credentials }, undefined, undefined, {
        context: new HttpContext().set(BYPASS_AUTH, true),
      })
      .pipe(
        tap((response) => {
          this.setSessions(response);
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userDetailsKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private loadUserFromStorage() {
    const token = this.getToken();
    const userDetails = JSON.parse(localStorage.getItem(this.userDetailsKey) || '{}');
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
