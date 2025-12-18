import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SubscriptionTypes } from '../../shared/models/interface';
import { Observable } from 'rxjs';

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
export class SubscriptionTypesService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/subscription-types`;

  createSubscriptionType(formData: FormData): Observable<SubscriptionTypes> {
    return this.http.post<SubscriptionTypes>(this.apiUrl, formData);
  }

  getAllSubscriptionTypes(page: number = 1, limit: number = 10, search: string = ''): Observable<PaginatedResponse<SubscriptionTypes>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<SubscriptionTypes>>(this.apiUrl, { params });
  }

  updateSubscriptionType(
    id: number,
    formData: FormData
  ): Observable<SubscriptionTypes> {
    return this.http.put<SubscriptionTypes>(`${this.apiUrl}/${id}`, formData);
  }

  deleteSubscriptionType(id: number): Observable<SubscriptionTypes> {
    return this.http.delete<SubscriptionTypes>(`${this.apiUrl}/${id}`);
  }
}
