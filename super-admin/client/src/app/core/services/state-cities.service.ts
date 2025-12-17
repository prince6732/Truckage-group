import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { City } from '../../shared/models/interface';
import { Observable } from 'rxjs';

export interface CityResponse {
  cities: City[];
  stateName: string;
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
export class StateCitiesService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/cities`;

  getAllCitiesByState(stateId: number, page: number = 1, limit: number = 10, search: string = ''): Observable<CityResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<CityResponse>(`${this.apiUrl}/${stateId}`, { params });
  }

  createCity(stateId: number, formData: FormData): Observable<City> {
    return this.http.post<City>(`${this.apiUrl}/${stateId}`, formData);
  }

  updateCity(id: number, formData: FormData): Observable<City> {
    return this.http.put<City>(`${this.apiUrl}/${id}`, formData);
  }

  deleteCity(id: number): Observable<City> {
    return this.http.delete<City>(`${this.apiUrl}/${id}`);
  }
}
