import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HeroSection } from '../../shared/models/interface';

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
export class HeroSectionService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/hero-section`;

  createHeroSection(formData: FormData): Observable<HeroSection> {
    return this.http.post<HeroSection>(this.apiUrl, formData);
  }

  getAllHeroSections(page: number = 1, limit: number = 10, search: string = ''): Observable<PaginatedResponse<HeroSection>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<HeroSection>>(this.apiUrl, { params });
  }

  updateHeroSection(
    id: number,
    formData: FormData
  ): Observable<HeroSection> {
    return this.http.put<HeroSection>(`${this.apiUrl}/${id}`, formData);
  }

  deleteHeroSection(id: number): Observable<HeroSection> {
    return this.http.delete<HeroSection>(`${this.apiUrl}/${id}`);
  }
}
