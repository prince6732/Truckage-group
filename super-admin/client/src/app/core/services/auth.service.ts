import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/interface';

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/auth`;
  
  private http = inject(HttpClient);

  login(formData: FormData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, formData);
  }

  forgotPassword(formData: FormData): Observable<{ user: User; accessToken: string }> {
    return this.http.post<{ user: User; accessToken: string }>(`${this.api}/forgot-password`, formData, httpOptions);
  }

  resetPassword(token: string, formData: FormData) {
    return this.http.post(`${this.api}/reset-password/${token}`, formData, httpOptions);
  }

}
