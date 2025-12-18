import { Injectable, signal, computed } from '@angular/core';
import { User } from '../../shared/models/interface';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const REFRESH_KEY = 'refresh-token';
const USER_KEY = 'auth-user';

interface DecodedToken extends JwtPayload {
  id?: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private _isLoggedIn = signal<boolean>(this.hasValidToken());
  isLoggedIn = computed(() => this._isLoggedIn());

  private _user = signal<User | null>(this.getStoredUser());
  user = computed(() => this._user());

  constructor() { }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);

    this._isLoggedIn.set(false);
    this._user.set(null);
  }

  public saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);

    const decoded = this.safeDecodeToken(token);
    if (decoded) {
      this._isLoggedIn.set(true);
    }
  }

  public saveRefreshToken(refresh: string): void {
    localStorage.setItem(REFRESH_KEY, refresh);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  }

  public saveUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  public getStoredUser(): User | null {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  private safeDecodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      console.warn('Invalid token');
      return null;
    }
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.safeDecodeToken(token);
    if (!decoded || !decoded.exp) return false;

    const isExpired = Math.floor(Date.now() / 1000) > decoded.exp;

    if (isExpired) {
      this.signOut();
      return false;
    }

    return true;
  }

  private hasValidToken(): boolean {
    return this.isAuthenticated();
  }

}
