import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { State } from '../../shared/models/interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
export class StateService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/states`;

  createState(formData: FormData): Observable<State> {
    return this.http.post<State>(this.apiUrl, formData);
  }

  getAllStates(page: number = 1, limit: number = 10, search: string = ''): Observable<PaginatedResponse<State>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<State>>(this.apiUrl, { params });
  }

  updateState(id: number, formData: FormData): Observable<State> {
    return this.http.put<State>(`${this.apiUrl}/${id}`, formData);
  }

  deleteState(id: number): Observable<State> {
    return this.http.delete<State>(`${this.apiUrl}/${id}`);
  }
}
