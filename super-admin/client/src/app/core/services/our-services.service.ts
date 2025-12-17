import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { OurServices } from '../../shared/models/interface';

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
export class OurServicesService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/our-services`;

  createOurService(formData: FormData): Observable<OurServices> {
    return this.http.post<OurServices>(this.apiUrl, formData);
  }

  getAllOurServices(page: number = 1, limit: number = 10, search: string = ''): Observable<PaginatedResponse<OurServices>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<OurServices>>(this.apiUrl, { params });
  }

  updateOurService(
    id: number,
    formData: FormData
  ): Observable<OurServices> {
    return this.http.put<OurServices>(`${this.apiUrl}/${id}`, formData);
  }

  deleteOurService(id: number): Observable<OurServices> {
    return this.http.delete<OurServices>(`${this.apiUrl}/${id}`);
  }
}
