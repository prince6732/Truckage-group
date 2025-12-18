import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Templates } from '../../shared/models/interface';

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
export class TemplatesService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/templates`;

  createTemplate(formData: FormData): Observable<Templates> {
    return this.http.post<Templates>(this.apiUrl, formData);
  }

  getAllTemplates(page: number = 1, limit: number = 10, search: string = ''): Observable<PaginatedResponse<Templates>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<Templates>>(this.apiUrl, { params });
  }

  updateTemplate(
    id: number,
    formData: FormData
  ): Observable<Templates> {
    return this.http.put<Templates>(`${this.apiUrl}/${id}`, formData);
  }

  deleteTemplate(id: number): Observable<Templates> {
    return this.http.delete<Templates>(`${this.apiUrl}/${id}`);
  }
}
