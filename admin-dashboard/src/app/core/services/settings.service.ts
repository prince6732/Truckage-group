import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Settings } from '../../shared/models/interface';

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/settings`;

  createSetting(formData: FormData): Observable<Settings> {
    return this.http.post<Settings>(this.apiUrl, formData);
  }

  getAllSettings(page: number = 1, limit: number = 10, search: string = ''): Observable<PaginatedResponse<Settings>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<Settings>>(this.apiUrl, { params });
  }

  updateSetting(key: string, formData: FormData): Observable<Settings> {
    return this.http.put<Settings>(`${this.apiUrl}/${key}`, formData);
  }

  deleteSetting(key: string): Observable<Settings> {
    return this.http.delete<Settings>(`${this.apiUrl}/${key}`);
  }
}
