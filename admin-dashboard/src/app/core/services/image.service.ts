import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/images`;

  getFiles(directory: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/get-files/${directory}`);
  }

  upload(file: File, directory: string = 'products'): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('directory', directory);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, { body: { path } });
  }
}
